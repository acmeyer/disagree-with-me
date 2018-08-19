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

end