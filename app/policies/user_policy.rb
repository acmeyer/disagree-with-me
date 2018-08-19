class UserPolicy
  attr_reader :user, :other_user

  def initialize(user, other_user)
    @user = user
    @other_user = other_user
  end

  def me?
    user.id == other_user.id
  end

  def change_password?
    user.id == other_user.id
  end

  def my_posts?
    user.id == other_user.id
  end

  def my_responses?
    user.id == other_user.id
  end

  def my_bookmarks?
    user.id == other_user.id
  end

  def my_thanks?
    user.id == other_user.id
  end

  def my_post_upvotes?
    user.id == other_user.id
  end

  def my_response_upvotes?
    user.id == other_user.id
  end
end