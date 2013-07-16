class Decision < ActiveRecord::Base
  attr_accessible :decided_id, :decider_id, :like
  before_save :check_for_matches

  belongs_to :judger,
  	:class_name => "User",
  	:foreign_key => :decider_id

  belongs_to :judged_user,
  	:class_name => "User",
  	:foreign_key => :decided_id

  validates :like, :inclusion => {:in => [true, false]}

  def check_for_matches
    @admired_user = User.find(self.decided_id)
    @decision = @admired_user.decisions.where(:decided_id => self.decider_id, :like => true).first
    if @decision && self.like
      @decider_match = Match.new(:admirer_id => self.decider_id, :admired_id => self.decided_id)
      @decided_match = Match.new(:admirer_id => self.decided_id, :admired_id => self.decider_id)
      @decider_match.save
      @decided_match.save
    end
  end

end
