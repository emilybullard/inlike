class Match < ActiveRecord::Base
  attr_accessible :admired_id, :admirer_id, :alerted

  belongs_to :admirer,
  :class_name => "User",
  :foreign_key => :admirer_id

  belongs_to :admired_user,
  :class_name => "User",
  :foreign_key => :admired_id

  def self.create_matches(decider_id, decided_id)
    decider_match = self.new(:admirer_id => decider_id, :admired_id => decided_id)
    decided_match = self.new(:admirer_id => decided_id, :admired_id => decider_id)
    decider_match.save
    decided_match.save
  end

end
