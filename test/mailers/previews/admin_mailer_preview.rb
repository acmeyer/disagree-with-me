# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview
  def new_reported_content
    AdminMailer.new_reported_content(Report.last.id)
  end
end
