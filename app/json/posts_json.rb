class PostsJson
  def initialize(user, posts, current_page, total_pages, total_entries, format=:full)
    @user = user
    @posts = posts
    @current_page = current_page
    @total_pages = total_pages
    @total_entries = total_entries
    @format = format
  end

  def as_json
    {
      more_results: @current_page.present? && @total_pages.present? && @current_page < @total_pages,
      page: @current_page,
      total_pages: @total_pages,
      total_entries: @total_entries,
      posts: @posts.map{|p| PostJson.new(p, @user, :full).call },
    }
  end
end
