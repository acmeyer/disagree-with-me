desc "Update stale conversations"
task :update_stale_conversations => [:environment] do |t|
  Post.all.each do |p|
    unless p.author_active?
      top_responses = p.responses.upvoted.order(cached_weighted_score: :desc).order(:created_at).limit(2)
      top_responses.update_all(author_thanked: true)
    end
  end
end
