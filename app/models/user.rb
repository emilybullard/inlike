class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me,
  	:username, :name, :birthday, :location, :gender, :preference, :uid, :name, :provider, :oauth_token
  # attr_accessible :title, :body

  before_save :set_preference

  has_many :photos

  has_many :decisions,
    :class_name => "Decision",
    :foreign_key => :decider_id

  has_many :judged_users,
    :through => :decisions,
    :source => :judged_user

  has_many :judgements,
    :class_name => "Decision",
    :foreign_key => :decided_id

  has_many :judgers,
    :through => :judgements,
    :source => :judger

  has_many :sent_messages,
    :class_name => "Message",
    :foreign_key => :sender_id

  has_many :received_messages,
    :class_name => "Message",
    :foreign_key => :recipient_id

  has_many :matches,
    :class_name => "Match",
    :foreign_key => :admired_id

  has_many :matched_users,
    :through => :matches,
    :source => :admired_user

  has_many :admirations,
    :class_name => "Match",
    :foreign_key => :admirer_id

  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(
                    name: auth.extra.raw_info.first_name,
                provider: auth.provider,
                  gender: (auth.extra.raw_info.gender == "male" ? "m" : "f"),
              preference: (auth.extra.raw_info.gender == "male" ? "f" : "m"),
                location: auth.info.location,
                     uid: auth.uid,
                   email: auth.info.email,
                password: Devise.friendly_token[0, 20],
             oauth_token: auth.credentials.token)
      user.create_photos
    end
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

  def create_photos
    albums = self.facebook.get_connections("me", "albums")
    album_id = nil
    albums.each do |album| 
      album_id = album["id"] if album["name"] == "Profile Pictures"
    end
    photos = self.facebook.get_connections(album_id, "photos")
    5.times do |i|
      self.photos.create(:photo_num => i + 1,
                         :image_url => photos[i]["source"])
    end
  end

  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end

  def set_guest_photo
    self.photos.create(:image_url => "https://dl.dropboxusercontent.com/u/34120492/frankocean.jpg")
  end

  def preferred_others
    if self.preference == "b"
      User.includes(:photos).where("id != ?", self.id)
    else
      User.includes(:photos).where("id != ? AND gender = ?", self.id, self.preference)
    end
  end

  def make_decision(params, decision)
    self.decisions.create!(decided_id: params, like: decision)
  end

  private

  def set_preference
    unless self.preference
      self.preference = (self.gender == "m" ? "f" : "m")
    end
  end

end
