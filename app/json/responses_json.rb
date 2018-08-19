class ResponsesJson
  def initialize(user, responses, current_page, total_pages, total_entries, format=:full)
    @user = user
    @responses = responses
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
      responses: @responses.map{|r| ResponseJson.new(r, @user, :full).call },
    }
  end
end
