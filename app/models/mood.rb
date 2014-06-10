class Mood < ActiveRecord::Base
	before_create :set_noted_at
	
	validates :mood, presence: true

	def set_noted_at
		self.noted_at = Time.now
	end
end
