module Admin
  class ApplicationController < ActionController::Base
    layout 'admin'
    before_action :authenticate_admin

    private
    def authenticate_admin
      if !current_admin_user
        redirect_to new_admin_user_session_path,  :alert =>  "You need to sign in first."
      elsif current_admin_user && !current_admin_user.admin?
        redirect_to "https://#{ENV['DOMAIN_NAME']}", :alert => "Unauthorized."
      end
    end
  end
end
