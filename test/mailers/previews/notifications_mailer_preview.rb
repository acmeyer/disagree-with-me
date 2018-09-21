# Preview all emails at http://localhost:3000/rails/mailers/notifications_mailer
class NotificationsMailerPreview < ActionMailer::Preview
  def new_response
    @notification = Notification.where(notification_type: 'New Response').last
    NotificationsMailer.new_response(@notification.id)
  end

  def response_thanked
    @notification = Notification.where(notification_type: 'Response Thanked').last
    NotificationsMailer.response_thanked(@notification.id)
  end

  def new_thanked
    @notification = Notification.where(notification_type: 'New Thanked Response').last
    NotificationsMailer.new_thanked(@notification.id)
  end

  def new_upvote
    @notification = Notification.where(notification_type: 'New Upvote').last
    NotificationsMailer.new_upvote(@notification.id)
  end
end
