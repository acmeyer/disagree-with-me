class Api::V1::UsersController < Api::V1::ApiController
  authorize_resource

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
    @bookmarks = @user.bookmarked_posts
    render_bookmarks
  end

  def my_thanks
    @thanks = @user.thanked_responses
    render_thanks
  end

  def my_post_upvotes
    @upvotes = @user.votes.up.for_type(Post)
    render_post_upvotes
  end

  def my_response_upvotes
    @upvotes = @user.votes.up.for_type(Response)
    render_response_upvotes
  end

  private
  def set_user_as_current_user
    @user = current_user
  end

  def render_error_message(message)
    render json: {error: message}, status: 422
  end

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

  def render_bookmarks
    json = @bookmarks.map{|p| PostJson.new(p, @user, :full).call }
    render json: json.as_json
  end

  def render_thanks
    json = @thanks.map{|r| ResponseJson.new(r, @user, :full).call }
    render json: json.as_json
  end

  def render_post_upvotes
    json = @upvotes.map{|p| PostJson.new(p, @user, :full).call }
    render json: json.as_json
  end

  def render_response_upvotes
    json = @upvotes.map{|r| ResponseJson.new(r, @user, :full).call }
    render json: json.as_json
  end
end
