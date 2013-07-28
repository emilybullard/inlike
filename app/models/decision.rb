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
      Match.create_matches(self.decider_id, self.decided_id)
    end
  end

end
