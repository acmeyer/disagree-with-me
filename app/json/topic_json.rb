class TopicJson
  def initialize(topic)
    @topic = topic
  end

  def call(options=nil)
    return to_json(@topic, options) unless @topic.respond_to?(:each)
    @topic.map { |topic| to_json(topic, options) }
  end

  private

  def to_json(topic, options)
    return nil unless topic
    Rails.cache.fetch("json/v1.0/#{topic.cache_key_with_version}") do
      full_json(topic, options)
    end
  end

  def full_json(topic, options)
    return nil if topic.nil?
    topic_json = {
      id: topic.id,
      title: topic.title,
      created_at: (post.created_at.to_f * 1000).to_i,
      updated_at: (post.updated_at.to_f * 1000).to_i,
    }
    return topic_json
  end
end
