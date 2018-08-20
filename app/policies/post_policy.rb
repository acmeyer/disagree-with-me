class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    true
  end

  def toggle_upvote?
    true
  end

  def toggle_bookmark?
    true
  end

end