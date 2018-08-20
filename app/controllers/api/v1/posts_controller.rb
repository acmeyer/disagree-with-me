class Api::V1::PostsController < Api::V1::ApiController
  before_action :set_user_as_current_user
  before_action :get_post, only: [:show, :toggle_upvote, :toggle_bookmark]

  def index
    @current_page = params[:page] || 1
    @posts = Post.all
    render_posts
  end

  def show
    render_post
  end

  def create
    begin
      if @post = Post.create(content: params[:content], author: @user)
        @post.reload
        render_post
      else 
        render_error_message(@post.errors.full_messages[0])
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  def toggle_upvote
    begin
      @user.toggle_upvote!(@post)
      render_post
    rescue => e
      render_error_message(e.message)
    end
  end

  def toggle_bookmark
    begin
      @user.toggle_bookmark!(@post)
      render_post
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def get_post
    @post = Post.find(params[:id])
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

  def render_post
    json = PostJson.new(@post, @user, :full).call
    render json: json.as_json
  end
end