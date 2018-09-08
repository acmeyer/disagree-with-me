class Api::V1::ReportsController < Api::V1::ApiController
  before_action :authenticate_user_from_token!, only: [:create]
  before_action :set_user_as_current_user

  def create
    begin
      if params[:type] === 'response'
        @obj = Response.find(params[:object_id])
      else
        @obj = Post.find(params[:object_id])
      end

      if @report = @obj.reports.create(report_params.merge(user_id: @user.id))
        render json: {message: t('api.messages.success', default: 'Success.')}, status: 200
      else 
        render_error_message(@report.errors.full_messages[0])
      end
    rescue => e
      render_error_message(e.message)
    end
  end

  private
  def report_params
    params.permit(:reason, :description)
  end
end