class MessagesController < ApplicationController

  def index
    @messages = current_user.received_messages
    render :json => @messages
  end

  def show
    @message = @message.find(params[:id])
    render :json => @message
  end

  def create
    @message = Message.new(params[:message])
    @message.save
    render :json => @message
  end

  def destroy
    @message = @message.find(params[:id])
    @message.destroy
    render :json => @message
  end

end
