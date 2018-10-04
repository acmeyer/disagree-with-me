class UserMailer < ApplicationMailer
  default from: "Disagree with Me <accounts@#{ENV['DOMAIN_NAME']}>"

  def inactive_author(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, subject: t('notifications.subjects.inactive_author'))
  end
end
