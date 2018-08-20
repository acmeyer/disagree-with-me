class ResponsePolicy
  attr_reader :user, :response

  def initialize(user, response)
    @user = user
    @response = response
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

  def thank?
    response.post.user_id == user.id
  end

end