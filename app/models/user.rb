class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me,
  	:username, :name, :birthday, :location, :gender, :preference
  # attr_accessible :title, :body

  has_many :photos

  has_many :decisions,
  	:class_name => "Decision",
  	:foreign_key => :decider_id

  has_many :judged_users,
  	:through => :decisions,
  	:source => :judged_user

  has_many :judgements,
  	:class_name => "Decision",
  	:foreign_key => :decided_id

  has_many :judgers,
  	:through => :judgements,
  	:source => :judger

  has_many :sent_messages,
    :class_name => "Message",
    :foreign_key => :sender_id

  has_many :received_messages,
    :class_name => "Message",
    :foreign_key => :recipient_id

  has_many :matches,
    :class_name => "Match",
    :foreign_key => :admired_id

  has_many :matched_users,
    :through => :matches,
    :source => :admired_user

  has_many :admirations,
    :class_name => "Match",
    :foreign_key => :admirer_id
end
