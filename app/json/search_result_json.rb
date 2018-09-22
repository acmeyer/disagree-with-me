class SearchResultJson
  def initialize(post, user)
    @post = post
    @user = user
  end

  def call(options=nil)
    return to_json(@post, @user, options) unless @post.respond_to?(:each)
    @post.map { |post| to_json(post, @user, options) }
  end

  private

  def to_json(post, user, options)
    return nil unless post
    full_json(post, user, options)
  end

  def full_json(post, user, options)
    return nil if post.nil?
    post_json = {
      id: post.id,
      content: post.highlight_result['content']['value'],
      responses_count: post.responses_count,
      upvotes_count: post.cached_votes_up,
      tags: post.tag_list,
      top_response: ResponseJson.new(post.top_response, user, :short).call,
      created_at: (post.created_at.to_f * 1000).to_i,
      updated_at: (post.updated_at.to_f * 1000).to_i,
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
      bookmarked: user.bookmarked_post?(post.id),
    }
  end
end
