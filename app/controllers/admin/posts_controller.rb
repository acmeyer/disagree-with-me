class Admin::PostsController < Admin::ApplicationController
  before_action :find_post, only: [:edit, :update, :show, :destroy]

  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @posts = Post.all.order(created_at: :desc).page(page).per(10)
    else
      @search_query = params[:search_query]
      @posts = Post.search_posts(@search_query).order(created_at: :desc).page(page).per(10)
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to admin_post_path(@post), notice: 'Post was successfully updated.'
    else
      render :edit
    end
  end

  def show
    responses_page = params[:responses_page] || 1
    @responses = @post.responses.page(responses_page).per(5)
    reports_page = params[:reports_page] || 1
    @reports = @post.reports.page(reports_page).per(5)
  end

  def destroy
    @post.destroy
    redirect_to admin_posts_path, notice: 'Post was successfully removed.'
  end

  private

  def find_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.fetch(:post, {}).permit(
      :user_id,
      :content,
      :responses_count,
      :cached_votes_up,
      :tag_list,
      :status
    )
  end
end
