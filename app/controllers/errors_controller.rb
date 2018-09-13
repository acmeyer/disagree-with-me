class ErrorsController < ApplicationController
  layout 'errors'

  def file_not_found
  end

  def internal_server_error
    respond_to do |format|
      format.json do
        render json: {error: t('errors.internal_error')}, status: 500
      end
      format.js
      format.html
    end
  end

  def error_401
  end
end
