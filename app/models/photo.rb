class Photo < ActiveRecord::Base
  attr_accessible :photo_num, :user_id, :image_url

  belongs_to :user

  validate :user_cant_have_more_than_5_photos

  private

  def user_cant_have_more_than_5_photos
  	@user = User.find(self.user_id)
  	if @user.photos.count >= 5
  		errors[:photo_count] << "User can't have more than 5 photos."
  	end
  end
end
