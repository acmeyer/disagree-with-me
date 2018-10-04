# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview
  def new_reported_content
    AdminMailer.new_reported_content(Report.last.id)
  end

  def new_flagged_content
    AdminMailer.new_flagged_content(Post.last.id, 'post', 'Abusive', 0.85424)
  end
end
