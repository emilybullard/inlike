class Decision < ActiveRecord::Base
  attr_accessible :decided_id, :decider_id, :like

  belongs_to :judger,
  	:class_name => "User",
  	:foreign_key => :decider_id

  belongs_to :judged_user,
  	:class_name => "User",
  	:foreign_key => :decided_id

  validates :like, :inclusion => {:in => [true, false]}
end
