class Message < ActiveRecord::Base
  attr_accessible :body, :recipient_id, :sender_id, :read

  belongs_to :sender,
  	:class_name => "User",
  	:foreign_key => :sender_id

  belongs_to :recipient,
  	:class_name => "User",
  	:foreign_key => :recipient_id
end
