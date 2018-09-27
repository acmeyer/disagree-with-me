class Admin::DashboardController < Admin::ApplicationController
  def index
    @recent_users = User.order(created_at: :desc).limit(5)
    @recent_posts = Post.order(created_at: :desc).limit(5)
  end
end
