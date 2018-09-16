class Api::V1::NotificationsController < Api::V1::ApiController
  before_action :authenticate_user_from_token!, only: [:index, :mark_read, :mark_all_read]
  before_action :set_user_as_current_user
  before_action :find_notification, only: [:mark_read, :mark_unread, :delete]

  def index
    begin
      if !params[:page].blank?
        @current_page = params[:page].to_i
      else
        @current_page = 1
      end
      filtered_notifications = filter_notifications(@user.notifications, params)
      @notifications = filtered_notifications
      render_notifications
    rescue => e
      render_error_message(e.message)
    end
  end

  def mark_read
    begin
      @notification.mark_read!
      @notification.reload
      render_notification
    rescue => e
      render_error_message(e.message)
    end
  end

  def mark_unread
    begin
      @notification.mark_unread!
      @notification.reload
      render_notification
    rescue => e
      render_error_message(e.message)
    end
  end

  def delete
    begin
      @notification.delete!
      @notification.reload
      render_notification
    rescue => e
      render_error_message(e.message)
    end
  end


  def mark_all_read
    @current_page = 1
    begin
      @notifications = @user.notifications
      @notifications.update_all(status: 'read')
      render_notifications
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def find_notification
    @notification = @user.notifications.find(params[:id])
  end

  def filter_notifications(notifications, params)
    if params[:unread] == "true"
      notifications = notifications.unread.not_deleted.order(created_at: :desc)
    elsif params[:read] == "true"
      notifications = notifications.read.not_deleted.order(created_at: :desc)
    else
      notifications = notifications.not_deleted.order(created_at: :desc)
    end

    return notifications
  end

  def render_notification
    json = NotificationJson.new(@notification, @user, :full).call
    render json: json.as_json
  end

  def render_notifications
    json = NotificationsJson.new(
      @user,
      @notifications.page(@current_page),
      @current_page,
      @notifications.page(@current_page).total_pages,
      @notifications.count,
      :full
    )
    render json: json.as_json
  end
end