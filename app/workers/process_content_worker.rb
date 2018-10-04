class ProcessContentWorker
  include Sidekiq::Worker

  def perform(obj_id, obj_type, content)
    if obj_type == 'post'
      resource = Post.find(obj_id)
    else
      resource = Response.find(obj_id)
    end
    response = HTTParty.post(
      "https://apis.paralleldots.com/v3/abuse?text=#{content}&api_key=#{ENV['PARALLELDOTS_API_KEY']}"
    )
    result = JSON.parse(response.body)
    if result['sentence_type'] == 'Abusive'
      resource.update!(status: :needs_review)
      AdminMailer.new_flagged_content(resource.id, obj_type, result['sentence_type'], result['confidence_score']).deliver_later
    else
      resouce.update!(status: :appropriate)
    end
  end
end
