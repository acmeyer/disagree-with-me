class NotificationsJson
  def initialize(user, notifications, current_page, total_pages, total_entries, format=:full)
    @user = user
    @notifications = notifications
    @current_page = current_page
    @total_pages = total_pages
    @total_entries = total_entries
    @format = format
  end

  def as_json
    {
      more_results: @current_page.present? && @total_pages.present? && (@current_page.to_i < @total_pages),
      page: @current_page,
      total_pages: @total_pages,
      total_entries: @total_entries,
      notifications: @notifications.map{|n| NotificationJson.new(n, @user, :full).call },
    }
  end
end
