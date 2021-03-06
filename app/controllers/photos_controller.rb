class PhotosController < ApplicationController

  def create
    @photo = current_user.photos.new(params[:photo])
    @photo.save
    render :json => @photo
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render :json => @photo
  end

end
