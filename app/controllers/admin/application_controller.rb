module Admin
  class ApplicationController < ActionController::Base
    layout 'admin'
    before_action :authenticate_admin

    private
    def authenticate_admin
      redirect_to "https://#{ENV['DOMAIN_NAME']}", :alert => "Unauthorized." unless current_admin_user && current_admin_user.admin?
    end
  end
end
