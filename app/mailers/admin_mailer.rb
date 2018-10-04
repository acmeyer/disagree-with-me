class AdminMailer < ApplicationMailer
  default from: "Disagree with Me Alerts <alerts@#{ENV['DOMAIN_NAME']}>"
  layout 'mailer'

  def new_reported_content(report_id)
    @report = Report.find(report_id)
    mail(to: 'admin@disagreewithme.app', subject: 'New reported content!')
  end

  def new_flagged_content(obj_id, type, flagged_as, confidence_score)
    if type == 'post'
      @resource = Post.find(obj_id)
    else
      @resource = Response.find(obj_id)
    end
    @content_type = type
    @flagged_as = flagged_as
    @confidence_score = confidence_score
    mail(to: 'admin@disagreewithme.app', subject: 'New flagged content!')
  end
end
