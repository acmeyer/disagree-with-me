class Admin::ResponsesController < Admin::ApplicationController
  before_action :find_post, except: [:index]
  before_action :find_response, only: [:edit, :update, :show, :destroy]

  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @responses = Response.all.order(created_at: :desc).page(page).per(10)
    else
      @search_query = params[:search_query]
      @responses = Response.search_responses(@search_query).order(created_at: :desc).page(page).per(10)
    end
  end

  def edit
  end

  def update
    if @response.update(response_params)
      redirect_to admin_post_path(@post), notice: 'Response was successfully updated.'
    else
      render :edit
    end
  end

  def show
    reports_page = params[:reports_page] || 1
    @reports = @response.reports.page(reports_page).per(5)
  end

  def destroy
    @response.destroy
    redirect_to admin_post_path(@post), notice: 'response was successfully removed.'
  end

  private
  def find_post
    @post = Post.find(params[:post_id]) unless params[:post_id].blank?
  end

  def find_response
    @response = Response.find(params[:id])
  end

  def response_params
    params.fetch(:response, {}).permit(
      :user_id,
      :content,
      :cached_votes_up
    )
  end
end
