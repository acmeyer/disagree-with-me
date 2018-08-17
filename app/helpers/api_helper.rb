module ApiHelper
  def unauthorized(e)
    render json: { error: "Unauthorized" }, status: 401
  end

  def not_found
    render json: { error: "Not Found" }, status: 404
  end

  # Custom Error classes for raising 4XX responses
  class Api::V1::Forbidden < StandardError
  end
  class Api::V1::NotFound < StandardError
  end
  class Api::V1::Invalid < StandardError
  end
  class Api::V1::Unauthorized < StandardError
  end 
end
