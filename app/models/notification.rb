class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notifiable, polymorphic: true, optional: true

  validates :message, presence: true

  after_initialize :set_default_status, :if => :new_record?
  after_create :send_notification_email

  enum notification_type: [
    'New Response',
    'App Announcement',
    'May Be Interested In',
    'Product Features',
    'Marketing News',
    'Response Thanked',
    'New Thanked Response',
    'New Upvote'
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

  def send_notification_email!
    notifications_setting = self.user.notifications_setting
    notification_type = self.notification_type
    case notification_type
    when 'New Response'
      if notifications_setting.new_response_email
        NotificationsMailer.new_response(self.id).deliver_later
      end
    when 'Response Thanked'
      if notifications_setting.response_thanked_email
        NotificationsMailer.response_thanked(self.id).deliver_later
      end
    when 'New Thanked Response'
      if notifications_setting.new_thanked_email
        NotificationsMailer.new_thanked(self.id).deliver_later
      end
    when 'New Upvote'
      if notifications_setting.new_upvote_email
        NotificationsMailer.new_upvote(self.id).deliver_later
      end
    end
  end

  private
  def set_default_status
    self.status ||= :unread
  end
end
