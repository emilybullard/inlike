class UsersController < ApplicationController

  def index
    @users = User.all
    render :json => @users
  end

  def show
    @user = User.find(params[:id])
    render :json => @user.to_json(:include => :photos)
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    render :json => @user
  end

  def like
    @like = current_user.decisions.create!(decided_id: params[:id], like: true)
    render :json => @like
  end

  def dislike
    @dislike = current_user.decisions.create!(decided_id: params[:id], like: false)
    render :json => @dislike
  end

end
