class Admin::AuthTokensController < Admin::ApplicationController
  before_action :find_user
  before_action :find_auth_token, only: [:show, :destroy, :expire]

  def show
  end

  def destroy
    if @auth_token.destroy
      redirect_to admin_user_path(@user), notice: 'Token was successfully removed.'
    else 
      redirect_to admin_user_auth_token_path(@user, @auth_token), alert: @auth_token.errors.full_messages[0] 
    end
  end

  def expire
    @auth_token.expires_at = DateTime.now
    @auth_token.save
    redirect_to admin_user_path(@user), notice: 'Token was successfully expired.'
  end

  private
  def find_user
    @user = User.find(params[:user_id]) unless params[:user_id].blank?
  end

  def find_auth_token
    @auth_token = AuthToken.find(params[:id])
  end
end
