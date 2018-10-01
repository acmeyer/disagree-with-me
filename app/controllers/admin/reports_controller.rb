class Admin::ReportsController < Admin::ApplicationController
  before_action :find_report, only: [:edit, :update, :show, :destroy]

  def index
    page = params[:page] || 1
    if params[:search_query].blank?
      @reports = Report.all.order(created_at: :desc).page(page).per(10)
    else
      @search_query = params[:search_query]
      @reports = Report.search_reports(@search_query).order(created_at: :desc).page(page).per(10)
    end
  end

  def edit
  end

  def update
    if @report.update(report_params)
      redirect_to admin_report_path(@report), notice: 'Report was successfully updated.'
    else
      render :edit
    end
  end

  def show
  end

  def destroy
    @report.destroy
    redirect_to admin_reports_path, notice: 'Report was successfully removed.'
  end

  private

  def find_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.fetch(:report, {}).permit(
      :status
    )
  end
end
