class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notifiable, polymorphic: true, optional: true

  validates :message, presence: true

  after_initialize :set_default_status, :if => :new_record?

  enum notification_type: [
    'New Response',
    'App Announcement',
    'May Be Interested In',
    'Product Features',
    'Marketing News'
  ]
  enum status: [:unread, :read, :deleted]

  scope :unread, -> { where(status: 'unread') }
  scope :read, -> { where(status: 'read') }
  scope :not_deleted, -> { where.not(status: 'deleted') }

  def mark_read!
    self.status = 'read'
    self.save!
  end

  def mark_unread!
    self.status = 'unread'
    self.save!
  end

  def delete!
    self.status = 'deleted'
    self.save!
  end

  private
  def set_default_status
    self.status ||= :unread
  end
end
