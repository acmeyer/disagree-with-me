class Api::V1::PostsController < Api::V1::ApiController
  before_action :set_user_as_current_user

  def index
    @posts = Post.all
    render_posts
  end

  def show
    @post = Post.find(params[:id])
    render_post
  end

  def create
    # TODO
  end

  private
  def render_posts
    json = @posts.map{|p| PostJson.new(p, @user, :full).call }
    render json: json.as_json
  end

  def render_post
    json = PostJson.new(@post, @user, :full).call
    render json: json.as_json
  end
end