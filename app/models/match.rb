class Match < ActiveRecord::Base
  attr_accessible :admired_id, :admirer_id, :alerted

  belongs_to :admirer,
  :class_name => "User",
  :foreign_key => :admirer_id

  belongs_to :admired_user,
  :class_name => "User",
  :foreign_key => :admired_id
end
