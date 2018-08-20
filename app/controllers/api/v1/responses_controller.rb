class Api::V1::ResponsesController < Api::V1::ApiController
  before_action :set_user_as_current_user
  before_action :get_post
  before_action :get_response, only: [:show, :toggle_upvote, :thank]

  def index
    @current_page = params[:page] || 1
    filtered_responses = filter_responses(@post.responses, params)
    @responses = filtered_responses
    render_responses
  end

  def show
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

  def toggle_upvote
    begin
      @user.toggle_upvote!(@response)
      render_response
    rescue => e
      render_error_message(e.message)
    end
  end

  def thank
    authorize @response
    begin
      @user.thank!(@response)
      @response.reload
      render_response
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def get_post
    @post = Post.find(params[:post_id])
  end

  def get_response
    @response = @post.responses.find(params[:id])
  end

  def filter_responses(responses, params)
    if params[:thanked_only] == "true"
      responses = responses.thanked
    elsif params[:not_thanked_only] == "true"
      responses = responses.not_thanked
    end
    if !params[:sort].blank?
      responses.order(sort)
    else
      responses.order(created_at: :desc)
    end

    return responses
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

  def render_response
    json = ResponseJson.new(@response, @user, :full).call
    render json: json.as_json
  end
end