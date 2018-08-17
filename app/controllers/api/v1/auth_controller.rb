class Api::V1::AuthController < ApplicationController
  include ApiHelper
  skip_before_action :verify_authenticity_token
  before_action :get_ip_address, :get_user_agent

  class Api::V1::Unauthorized < StandardError
  end

  rescue_from ActionController::RoutingError, with: :not_found
  rescue_from Api::V1::Unauthorized, with: :unauthorized
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def signin
    begin
      @user = User.find_for_authentication(:email => params[:email])
      if @user&.valid_password?(params[:password])
        AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
        @user.reload
        render_user
      else
        render_error_message(t('api.auth.invalid_email_or_password', default: 'Invalid email or password.'))
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  def signup
    begin
      @user = User.new(user_sign_up_params)
      @user.save!
      AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
      @user.reload
      render_user
    rescue => e
      record_invalid(e)
    end
  end

  private
  def render_user
    json = UserJson.new(@user, :auth).call
    render json: json.as_json
  end

  def render_error_message(message)
    render json: {error: message}, status: 422
  end

  def record_invalid(e)
    render json: { error: e.message, validation_errors: e.try(:record).try(:errors) }, status: 422
  end

  def get_ip_address
    @ip_address = request.remote_ip
  end

  def get_user_agent
    @user_agent = request.user_agent
  end

  def user_sign_up_params
    params.fetch(:user, {}).permit(
      :email,
      :password,
      :password_confirmation,
    )
  end
end
