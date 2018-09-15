class ResponseJson
  def initialize(response, user, format = :full)
    @response = response
    @user = user
    @format = (format || :full).to_s.to_sym
  end

  def call(options=nil)
    return to_json(@response, @user, options) unless @response.respond_to?(:each)
    @response.map { |response| to_json(response, @user, options) }
  end

  private

  def to_json(response, user, options)
    return nil unless response
    Rails.cache.fetch("json/v1.0/#{@format}/#{user ? user.cache_key_with_version : 'anonymous'}/#{response.cache_key_with_version}") do
      case @format
      when :full
        full_json(response, user, options)
      else
        short_json(response, user, options)
      end
    end
  end

  def short_json(response, user, options)
    {
      id: response.id,
      post_id: response.post_id,
      content: response.content,
      upvotes_count: response.cached_votes_up,
      author_thanked: response.author_thanked,
      created_at: (response.created_at.to_f * 1000).to_i,
      updated_at: (response.updated_at.to_f * 1000).to_i,
    }
  end

  def full_json(response, user, options)
    return nil if response.nil?
    response_json = {
      id: response.id,
      post_id: response.post_id,
      content: response.content,
      upvotes_count: response.cached_votes_up,
      author_thanked: response.author_thanked,
      created_at: (response.created_at.to_f * 1000).to_i,
      updated_at: (response.updated_at.to_f * 1000).to_i,
    }
    response_json = response_json.merge(response_user_json(response, user)) if user
    return response_json
  end

  def response_user_json(response, user)
    return nil if user.nil?
    {
      is_author: user.id == response.user_id,
      is_post_author: user.id == response.post.user_id,
      upvoted: user.voted_up_for?(response),
    }
  end
end
