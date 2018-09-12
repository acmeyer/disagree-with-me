class AdminMailer < ApplicationMailer
  default from: "alerts@#{ENV['DOMAIN_NAME']}"
  layout 'mailer'

  def new_reported_content(report_id)
    @report = Report.find(report_id)
    mail(to: 'admin@disagreewithme.app', subject: 'New reported content!')
  end
end
