class Api::V1::PostsController < Api::V1::ApiController
  before_action :set_user_as_current_user

  def index
    @current_page = params[:page] || 1
    @posts = Post.all
    render_posts
  end

  def show
    @post = Post.find(params[:id])
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

  private
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