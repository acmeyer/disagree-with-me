class Admin::UsersController < Admin::ApplicationController
  before_action :find_user, only: [:edit, :update, :show, :destroy, :disable, :enable]

  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @users = User.all.order(:id).page(page).per(10)
    else
      @search_query = params[:search_query]
      @users = User.search_users(@search_query).order(:id).page(page).per(10)
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_user_path(@user), notice: 'User was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    # Careful when using update_without_password!!
    # Only admins should have this capability
    if @user.update_without_password(user_params)
      redirect_to admin_user_path(@user), notice: 'User was successfully updated.'
    else
      render :edit
    end
  end

  def show
    posts_page = params[:posts_page] || 1
    @posts = @user.posts.page(posts_page).per(5)
    responses_page = params[:responses_page] || 1
    @responses = @user.responses.page(responses_page).per(5)
    reports_page = params[:reports_page] || 1
    @reports = @user.reports.page(reports_page).per(5)
    auth_tokens_page = params[:auth_tokens_page] || 1
    @auth_tokens = @user.auth_tokens.page(auth_tokens_page).per(5)
  end

  def disable
    if @user.disable
      redirect_to admin_user_path(@user), notice: 'User account is disabled.'
    else
      redirect_to admin_user_path(@user), alert: @user.errors.full_messages[0]
    end
  end

  def enable
    if @user.enable
      redirect_to admin_user_path(@user), notice: 'User account is enabled.'
    else
      redirect_to admin_user_path(@user), alert: @user.errors.full_messages[0]
    end
  end

  def destroy
    @user.destroy
    redirect_to admin_users_path, notice: 'User was successfully removed.'
  end

  private

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.fetch(:user, {}).permit(
      :email,
      :password,
    )
  end
end
