class Api::V1::TopicsController < Api::V1::ApiController 
  before_action :authenticate_user_from_token!, only: [:create]
  before_action :set_user_as_current_user
  before_action :get_topic, only: [:show]

  def index
    if !params[:page].blank?
      @current_page = params[:page].to_i
    else
      @current_page = 1
    end
    filtered_topics = filter_topics(Topic.all, params)
    @topics = filtered_topics
    render_topics
  end

  def show
    render_topic
  end

  def create
    begin
      if @topic = Topic.create(title: params[:title])
        @topic.reload
        render_topic
      else 
        render_error_message(@topic.errors.full_messages[0])
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def get_topic
    @topic = Topic.find(params[:id])
  end

  def filter_topics(topics, params)
    if !params[:topic].blank?
      topic = Topic.find_by_title(params[:topic])
      topics = topic.topics if topic
    elsif params[:random] == "true"
      topics = topics.order("RANDOM()")
    else
      topics = topics.order(created_at: :desc)
    end

    if !params[:sort].blank?
      topics = topics.order(params[:sort])
    end

    return topics
  end

  def render_topics
    json = TopicsJson.new(
      @topics.page(@current_page),
      @current_page,
      @topics.page(@current_page).total_pages,
      @topics.page(@current_page).total_count
    )
    render json: json.as_json
  end

  def render_topic
    json = TopicJson.new(@topic).call
    render json: json.as_json
  end
end