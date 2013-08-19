module ApplicationHelper

  def current_or_guest_user
    if current_user
      current_user
    else
      guest_user
    end
  end

  def guest_user
    @cached_guest_user ||= User.find(session[:guest_user_id] || create_guest_user.id)

    rescue ActiveRecord::RecordNotFound
      session[:guest_user_id] = nil
      guest_user
  end

  def create_guest_user
    u = User.create(
      name: "Frank Ocean",
      gender: "m",
      preference: "f",
      location: "Los Angeles, CA",
      email: "frank@ocean.com",
      password: Devise.friendly_token[0, 20])
    u.set_guest_photo
    u.save!(:validate => false)
    session[:guest_user_id] = u.id
    u
  end

  def check_for_current_or_guest
    unless current_user || session[:guest_user_id]
      redirect_to new_user_session_url
    end
  end
  
end
