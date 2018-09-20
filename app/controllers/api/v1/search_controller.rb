class Api::V1::SearchController < Api::V1::ApiController
  before_action :set_user_as_current_user

  def index
    begin
      if !params[:page].blank?
        @current_page = params[:page].to_i
      else
        @current_page = 1
      end
      if !params[:sortBy].blank?
        if params[:sortBy] == 'Most Popular'
          @posts = Post.search(params[:query], replica: "Post_#{ENV['ALGOLIA_ENVIRONMENT']}_popular", hitsPerPage: 10)
        elsif params[:sortBy] == 'Most Recent'
          @posts = Post.search(params[:query], replica: "Post_#{ENV['ALGOLIA_ENVIRONMENT']}_latest", hitsPerPage: 10)
        else
          @posts = Post.search(params[:query], hitsPerPage: 10)
        end
      else
        @posts = Post.search(params[:query], hitsPerPage: 10)
      end
      render_results
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def render_results
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
end