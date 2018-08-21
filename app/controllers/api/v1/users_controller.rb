class Api::V1::UsersController < Api::V1::ApiController
  before_action :authenticate_user_from_token!, :set_current_user
  before_action :set_user_as_current_user

  def me
    authorize @user
    render_user(:short)
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
    @current_page = params[:page] || 1
    @posts = @user.posts
    render_posts
  end

  def my_responses
    authorize @user
    @current_page = params[:page] || 1
    @responses = @user.responses
    render_responses
  end

  def my_bookmarks
    authorize @user
    @current_page = params[:page] || 1
    @posts = @user.bookmarked_posts
    render_posts
  end

  def my_thanks
    authorize @user
    @current_page = params[:page] || 1
    @responses = @user.thanked_responses
    render_responses
  end

  def my_post_upvotes
    authorize @user
    @current_page = params[:page] || 1
    @posts = @user.votes.up.for_type(Post)
    render_posts
  end

  def my_response_upvotes
    authorize @user
    @current_page = params[:page] || 1
    @responses = @user.votes.up.for_type(Response)
    render_responses
  end

  private
  def user_password_params
    params.permit(:current_password, :password, :password_confirmation)
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
