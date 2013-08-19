class RootController < ApplicationController
  before_filter :check_for_current_or_guest, :except => :guest 

  def root
    @user = current_or_guest_user
  end

  def guest
    create_guest_user
    redirect_to root_url
  end

  def guest_log_out
    if session[:guest_user_id]
      session[:guest_user_id] = nil
      redirect_to new_user_session_url
      return
    end
    redirect_to new_user_session_url
  end

end
