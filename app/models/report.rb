class Report < ApplicationRecord
  belongs_to :user
  belongs_to :reportable, polymorphic: true

  validates :reason, presence: true

  after_initialize :set_default_status, :if => :new_record?
  after_create :send_admin_email

  enum reason: ['off-topic', 'inappropriate', 'abusive', 'other']
  enum status: [:unresolved, :resolved]

  private
  def set_default_status
    self.status ||= :unresolved
  end

  def send_admin_email
    puts "Need to set up email to send admins for reports."
  end
end
