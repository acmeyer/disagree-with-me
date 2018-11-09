class Admin::TopicsController < Admin::ApplicationController
  before_action :find_topic, only: [:edit, :update, :show, :destroy]

  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @topics = Topic.all.order(created_at: :desc).page(page).per(10)
    else
      @search_query = params[:search_query]
      @topics = Topic.search_topics(@search_query).order(created_at: :desc).page(page).per(10)
    end
  end

  def edit
  end

  def update
    if @topic.update(topic_params)
      redirect_to admin_topic_path(@topic), notice: 'Topic was successfully updated.'
    else
      render :edit
    end
  end

  def show
  end

  def destroy
    @topic.destroy
    redirect_to admin_topics_path, notice: 'Topic was successfully removed.'
  end

  private

  def find_topic
    @topic = Topic.find(params[:id])
  end

  def topic_params
    params.fetch(:topic, {}).permit(
      :title
    )
  end
end
