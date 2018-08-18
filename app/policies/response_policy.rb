class ResponsePolicy
  attr_reader :user, :response

  def initialize(user, response)
    @user = user
    @response = response
  end

end