class Admin::TagsController < Admin::ApplicationController
  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @tags = Post.tags_on(:tags).order(taggings_count: :desc).page(page)
    else
      @search_query = params[:search_query]
      @tags = Post.tags_on(:tags).where("name LIKE ?", @search_query).order(taggings_count: :desc).page(page)
    end
  end

  def show
    @tag = Post.tags_on(:tags).find_by_name(params[:name])
    @posts = Post.tagged_with(params[:name]).page(params[:posts_page])
  end
end
