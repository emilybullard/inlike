class MatchesController < ApplicationController

  def index
    @matches = current_user.matches
    render :json => @matches
  end

  def show
    @match = Match.find(params[:id])
    render :json => @match
  end

  def update
    @match = Match.find(params[:id])
    @match.update_attributes(params[:match])
    render :json => @match
  end

end
