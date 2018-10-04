class Admin::DashboardController < Admin::ApplicationController
  def index
    @recent_users = User.order(created_at: :desc).limit(5)
    @recent_posts = Post.order(created_at: :desc).limit(5)
    @recent_responses = Response.order(created_at: :desc).limit(5)
    @recent_reports = Report.unresolved.order(created_at: :desc).limit(5)
    @pending_posts = Post.pending_review.order(created_at: :desc).limit(5)
    @pending_responses = Response.pending_review.order(created_at: :desc).limit(5)
  end
end
