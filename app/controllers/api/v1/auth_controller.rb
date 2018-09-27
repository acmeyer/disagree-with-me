class Api::V1::AuthController < ApplicationController
  include ApiHelper
  skip_before_action :verify_authenticity_token
  before_action :get_ip_address, :get_user_agent

  class Api::V1::Unauthorized < StandardError
  end

  rescue_from ActionController::RoutingError, with: :not_found
  rescue_from Api::V1::Unauthorized, with: :unauthorized
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  def oauth
    begin
      @user = User.create_or_load_from_omniauth(oauth_params)
      if @user
        AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
        @user.reload
        render_user
      else
        render_error_message(t('api.auth.oauth_failed', default: 'Authentication with provider failed. Please try again or contact support@disagreewithme.app.'))
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  def signin
    begin
      @user = User.find_for_authentication(:email => params[:email])
      if @user&.disabled
        render_error_message(t('api.auth.account_disabled', default: 'Your account has been disabled. Please contact support@disagreewithme.app for more information.'))
      elsif @user&.valid_password?(params[:password])
        if !@user.confirmed?
          render_error_message('email_confirmation')
        else
          AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
          @user.reload
          render_user
        end
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
      if @user.confirmed?
        AuthToken.generate_new_token(@user.id, @ip_address, @user_agent)
        @user.reload
        render_user
      else
        render_error_message('email_confirmation')
      end
    rescue => e
      record_invalid(e)
    end
  end

  def send_reset_password_instructions
    begin
      @user = User.find_by_email!(params[:email])
      @user.send_reset_password_instructions
      render json: {message: I18n.t('api.messages.success')}, status: 200
    rescue => e
      render_error_message(e.message)
    end
  end

  def resend_confirmation_email
    begin
      @user = User.find_by_email!(params[:email])
      @user.resend_confirmation_instructions
      render json: {message: I18n.t('api.messages.success')}, status: 200
    rescue => e
      render_error_message(e.message)
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

  def record_not_found(e)
    render json: { error: t('api.errors.not_found', default: 'Not Found.') }, status: 404
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
    params.permit(
      :email,
      :password,
      :password_confirmation,
    )
  end

  def oauth_params
    params.permit(
      :provider,
      :token,
      :uid,
      :email,
    )
  end
end
