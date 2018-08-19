class PostJson
  def initialize(post, user, format = :full)
    @post = post
    @user = user
    @format = (format || :full).to_s.to_sym
  end

  def call(options=nil)
    return to_json(@post, @user, options) unless @post.respond_to?(:each)
    @post.map { |post| to_json(post, @user, options) }
  end

  private

  def to_json(post, user, options)
    return nil unless post
    Rails.cache.fetch("json/v1.0/#{@format}/#{post.cache_key}/#{user ? user.cache_key : 'anonymous'}") do
      case @format
      when :full
        full_json(post, user, options)
      else
        short_json(post, user, options)
      end
    end
  end

  def short_json(post, user, options)
    {
      id: post.id,
      content: post.content,
      responses_count: post.responses_count,
      upvotes_count: post.cached_votes_up,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }
  end

  def full_json(post, user, options)
    return nil if post.nil?
    post_json = {
      id: post.id,
      content: post.content,
      responses_count: post.responses_count,
      upvotes_count: post.cached_votes_up,
      created_at: post.created_at,
      updated_at: post.updated_at,
    }
    post_json = post_json.merge(post_user_json(post, user)) if user
    return post_json
  end

  def post_user_json(post, user)
    return nil if user.nil?
    {
      is_author: user.id == post.user_id,
      upvoted: user.voted_up_for?(post),
      responded_to: user.responded_to_post?(post.id),
    }
  end
end