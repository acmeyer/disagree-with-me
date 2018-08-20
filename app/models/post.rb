class Post < ApplicationRecord
  acts_as_votable
  acts_as_taggable
  belongs_to :author, class_name: "User", foreign_key: :user_id
  has_many :responses, dependent: :destroy

  validates :content, presence: true

  after_save :update_tags, if: Proc.new { |post| post.saved_change_to_content? }

  private
  def update_tags
    # auto-add tags using Google's Natural Language API
    language_service_client = Google::Cloud::Language.new
    content = self.content
    type = :PLAIN_TEXT
    document = { content: content, type: type }
    response = language_service_client.analyze_entities(document)
    tags = response.entities.map{|e| e.name}.join(',')
    self.tag_list = tags
    self.save
  end
end
