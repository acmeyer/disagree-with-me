class Api::V1::PostsController < Api::V1::ApiController 
  before_action :authenticate_user_from_token!, :set_current_user, only: [:create, :toggle_bookmark, :toggle_upvote]
  before_action :set_user_as_current_user
  before_action :get_post, only: [:show, :toggle_upvote, :toggle_bookmark]

  def index
    @current_page = params[:page] || 1
    filtered_posts = filter_posts(Post.all, params)
    @posts = filtered_posts
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

  def filter_posts(posts, params)
    if params[:latest] == "true"
      posts = posts.order(created_at: :desc)
    elsif params[:popular] == "true"
      posts = posts.order(cached_weighted_score: :desc).order(responses_count: :desc)
    elsif params[:sort]
      posts.order(sort)
    else
      posts.order(created_at: :desc)
    end

    return posts
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