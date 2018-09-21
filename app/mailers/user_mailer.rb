class UserMailer < ApplicationMailer
  def welcome_email(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, from: "Disagree with Me <hi@#{ENV['DOMAIN_NAME']}>", subject: t('emails.welcome_subject'))
  end
end
