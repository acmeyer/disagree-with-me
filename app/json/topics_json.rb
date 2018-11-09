class TopicsJson
  def initialize(topics, current_page, total_pages, total_entries)
    @topics = topics
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
      topics: @topics.map{|t| TopicJson.new(t).call },
    }
  end
end
