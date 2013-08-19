class ApplicationController < ActionController::Base
  protect_from_forgery :except => :guest

  include ApplicationHelper

end