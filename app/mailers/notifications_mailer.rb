class NotificationsMailer < ApplicationMailer
  default from: "Disagree with Me Notifications <notifications@#{ENV['DOMAIN_NAME']}>"
  layout 'notifications'

  def new_response(notification_id)
    @notification = Notification.find(notification_id)
    @user = @notification.user
    mail(to: @user.email, subject: t('notifications.subjects.new_response'))
  end

  def response_thanked(notification_id)
    @notification = Notification.find(notification_id)
    @user = @notification.user
    mail(to: @user.email, subject: t('notifications.subjects.thanked_response'))
  end

  def new_thanked(notification_id)
    @notification = Notification.find(notification_id)
    @user = @notification.user
    mail(to: @user.email, subject: t('notifications.subjects.new_response_to_bookmarked'))
  end

  def new_upvote(notification_id)
    @notification = Notification.find(notification_id)
    @user = @notification.user
    mail(to: @user.email, subject: t('notifications.subjects.new_upvote', resource_type: @notification.notifiable_type.downcase))
  end
end
