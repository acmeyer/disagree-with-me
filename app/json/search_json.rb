class SearchJson
  def initialize(user, posts, current_page, total_pages, total_entries)
    @user = user
    @posts = posts
    @current_page = current_page
    @total_pages = total_pages
    @total_entries = total_entries
  end

  def as_json
    {
      more_results: @current_page.present? && @total_pages.present? && (@current_page.to_i < @total_pages),
      page: @current_page,
      total_pages: @total_pages,
      total_entries: @total_entries,
      posts: @posts.map{|p| SearchResultJson.new(p, @user).call },
    }
  end
end
