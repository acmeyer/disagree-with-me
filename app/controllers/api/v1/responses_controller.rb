class Api::V1::ResponsesController < Api::V1::ApiController
  before_action :get_post
  before_action :set_user_as_current_user

  def index
    @current_page = params[:page] || 1
    @responses = @post.responses
    render_responses
  end

  def show
    @response = @post.responses.find(params[:id])
    render_response
  end

  def create
    begin
      if @response = @post.responses.create(content: params[:content], author: @user)
        @response.reload
        render_response
      else 
        render_error_message(@response.errors.full_messages[0])
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def get_post
    @post = Post.find(params[:post_id])
  end

  def render_responses
    json = ResponsesJson.new(
      @user,
      @responses,
      @current_page,
      @responses.page(@current_page).total_pages,
      @responses.count,
      :full
    )
    render json: json.as_json
  end

  def render_response
    json = ResponseJson.new(@response, @user, :full).call
    render json: json.as_json
  end
end