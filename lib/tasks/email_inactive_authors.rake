desc "Email inactive post authors"
task :email_inactive_authors => [:environment] do |t|
  Post.all.each do |p|
    if !p.author_active? && !p.author.sent_inactive_email
      UserMailer.inactive_author(p.author.id).deliver_later
      p.author.sent_inactive_email = true
      p.author.save!
    end
  end
end
