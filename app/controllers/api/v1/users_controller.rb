class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user_from_token!
  before_action :set_user_as_current_user

  def me
    authorize @user
    render_user(:full)
  end

  def change_password
    authorize @user
    begin
      if @user.update_with_password(user_password_params)
        AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
        @user.reload
        render_user(:auth)
      else
        render_error_message(@user.errors.full_messages[0])
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  def my_posts
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @posts = @user.posts.approved.order(created_at: :desc)
    render_posts
  end

  def my_responses
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @responses = @user.responses.approved.order(created_at: :desc)
    render_responses
  end

  def my_bookmarks
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @posts = @user.bookmarked_posts.order(created_at: :desc)
    render_posts
  end

  def my_thanks
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @responses = @user.thanked_responses.order(created_at: :desc)
    render_responses
  end

  def my_post_upvotes
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @posts = @user.get_up_voted(Post).order(created_at: :desc)
    render_posts
  end

  def my_response_upvotes
    authorize @user
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    @responses = @user.get_up_voted(Response).order(created_at: :desc)
    render_responses
  end

  def my_notifications_settings
    authorize @user
    @user.notifications_setting.update(notification_params)
    render_user(:full)
  end

  private
  def user_password_params
    params.permit(:current_password, :password, :password_confirmation)
  end

  def notification_params
    params.permit(:new_response_email, :response_thanked_email, :new_thanked_email, :new_upvote_email)
  end

  def render_user(format)
    json = UserJson.new(@user, format).call
    render json: json.as_json
  end

  def render_posts
    json = PostsJson.new(
      @user,
      @posts.page(@current_page),
      @current_page,
      @posts.page(@current_page).total_pages,
      @posts.count,
      :full
    )
    render json: json.as_json
  end

  def render_responses
    json = ResponsesJson.new(
      @user,
      @responses.page(@current_page),
      @current_page,
      @responses.page(@current_page).total_pages,
      @responses.count,
      :full
    )
    render json: json.as_json
  end
end
