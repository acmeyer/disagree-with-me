class UserMailer < ApplicationMailer
  def welcome_email(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, from: 'hi@disagreewithme.app', subject: t('emails.welcome_subject'))
  end
end
