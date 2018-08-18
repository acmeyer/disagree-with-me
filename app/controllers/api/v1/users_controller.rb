class Api::V1::UsersController < Api::V1::ApiController
  before_action :set_user_as_current_user

  def me
    render_user(:short)
  end

  def change_password
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
    @posts = @user.posts
    render_posts
  end

  def my_responses
    @responses = @user.responses
    render_responses
  end

  def my_bookmarks
    @posts = @user.bookmarked_posts
    render_posts
  end

  def my_thanks
    @responses = @user.thanked_responses
    render_responses
  end

  def my_post_upvotes
    @posts = @user.votes.up.for_type(Post)
    render_posts
  end

  def my_response_upvotes
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
    json = @posts.map{|p| PostJson.new(p, @user, :full).call }
    render json: json.as_json
  end

  def render_responses
    json = @responses.map{|r| ResponseJson.new(r, @user, :full).call }
    render json: json.as_json
  end
end
