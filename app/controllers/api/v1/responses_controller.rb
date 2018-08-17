class Api::V1::ResponsesController < Api::V1::ApiController
  before_action :get_post
  before_action :set_user_as_current_user

  def index
    @responses = @post.responses
    render_responses
  end

  def show
    @response = @post.responses.find(params[:id])
    render_response
  end

  def create
    # TODO
  end

  private
  def get_post
    @post = Post.find(params[:post_id])
  end

  def render_responses
    json = @responses.map{|r| ResponseJson.new(r, @user, :full).call }
    render json: json.as_json
  end

  def render_response
    json = ResponseJson.new(@response, @user, :full).call
    render json: json.as_json
  end
end