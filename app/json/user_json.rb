class UserJson
  def initialize(user, format = :full)
    @user = user
    @format = (format || :full).to_s.to_sym
  end

  def call(options=nil)
    return to_json(@user, options) unless @user.respond_to?(:each)
    @user.map { |user| to_json(user, options) }
  end

  private

  def to_json(user, options)
    return nil unless user
    Rails.cache.fetch("json/v1.0/#{@format}/#{user.cache_key_with_version}") do
      case @format
      when :auth
        auth_json(user, options)
      when :full
        full_json(user, options)
      else
        short_json(user, options)
      end
    end
  end

  def short_json(user, options)
    {
      id: user.id,
      email: user.email,
    }
  end

  def auth_json(user, options)
    return nil if user.nil?
    {
      id: user.id,
      email: user.email,
      apiToken: user.auth_tokens.last.try(:token),
    }
  end

  def full_json(user, options)
    return nil if user.nil?
    {
      id: user.id,
      email: user.email,
      notifications_settings: {
        new_response_email: user.notifications_setting.new_response_email,
        response_thanked_email: user.notifications_setting.response_thanked_email,
        new_thanked_email: user.notifications_setting.new_thanked_email,
        new_upvote_email: user.notifications_setting.new_upvote_email,
      }
    }
  end
end
