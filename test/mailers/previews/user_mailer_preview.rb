# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def inactive_author
    @user = User.all.last.id
    UserMailer.inactive_author(@user)
  end
end
