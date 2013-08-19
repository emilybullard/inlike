class Photo < ActiveRecord::Base
  attr_accessible :photo_num, :user_id, :image_url

  belongs_to :user

  validate :user_cant_have_more_than_5_photos

  before_create :set_photo_num

  private

  def set_photo_num
    user = User.find(self.user_id)
    self.photo_num = user.photos.count + 1
  end


  def user_cant_have_more_than_5_photos
  	@user = User.find(self.user_id)
  	if @user.photos.count >= 5
  		errors[:photo_count] << "User can't have more than 5 photos."
  	end
  end
end
