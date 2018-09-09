class NotificationJson
  def initialize(notification, user, format = :full)
    @notification = notification
    @user = user
    @format = (format || :full).to_s.to_sym
  end

  def call(options=nil)
    return to_json(@notification, @user, options) unless @notification.respond_to?(:each)
    @notification.map { |notification| to_json(notification, @user, options) }
  end

  private

  def to_json(notification, user, options)
    return nil unless notification
    Rails.cache.fetch("json/v1.0/#{@format}/#{notification.cache_key}/#{user.cache_key}") do
      case @format
      when :full
        full_json(notification, user, options)
      else
        short_json(notification, user, options)
      end
    end
  end

  def short_json(notification, user, options)
    {
      id: notification.id,
      message: notification.message,
      status: notification.status,
      type: notification.notification_type,
      created_at: (notification.created_at.to_f * 1000).to_i,
      updated_at: (notification.updated_at.to_f * 1000).to_i,
    }
  end

  def full_json(notification, user, options)
    return nil if notification.nil?
    notification_json = {
      id: notification.id,
      message: notification.message,
      status: notification.status,
      type: notification.notification_type,
      created_at: (notification.created_at.to_f * 1000).to_i,
      updated_at: (notification.updated_at.to_f * 1000).to_i,
    }
    notification_json = notification_json.merge({
      post: PostJson.new(notification.notifiable, user, :short).call,
    }) if notification.notifiable_type && notification.notifiable_type == "Post"
    notification_json = notification_json.merge({
      response: ResponseJson.new(notification.notifiable, user, :short).call,
    }) if notification.notifiable_type && notification.notifiable_type == "Response"
    return notification_json
  end
end
