class Post < ApplicationRecord
  include ActionView::Helpers::TextHelper

  acts_as_paranoid
  acts_as_votable
  acts_as_taggable

  belongs_to :author, class_name: "User", foreign_key: :user_id
  belongs_to :topic, touch: true
  has_many :responses, dependent: :destroy
  has_many :reports, as: :reportable, dependent: :destroy

  validates :content, presence: true

  after_create :check_content, :update_tags
  after_save :update_tags, if: Proc.new { |post| post.saved_change_to_content? }

  enum status: [:processing, :inappropriate, :appropriate, :needs_review]
  
  scope :approved, -> { where(status: :appropriate) }
  scope :not_approved, -> { where.not(status: :appropriate) }
  scope :pending_review, -> { where(status: :needs_review) }

  include PgSearch
  pg_search_scope :search_posts, :against => [:content]

  include AlgoliaSearch
  algoliasearch index_name: "Post_#{ENV['ALGOLIA_ENVIRONMENT']}" do
    attribute :content

    add_attribute :responses_count do
      self.responses_count
    end
    add_attribute :upvotes_count do 
      self.cached_votes_up
    end
    add_attribute :top_response do
      self.top_response
    end
    add_attribute :created_at do 
      (self.created_at.to_f * 1000).to_i
    end

    add_attribute :tags do
      self.tag_list.join(" ")
    end

    searchableAttributes ['unordered(content)', 'unordered(tags)']

    add_replica "Post_#{ENV['ALGOLIA_ENVIRONMENT']}_popular", inherit: true, per_environment: true do
      customRanking ['desc(upvotes_count)', 'desc(responses_count)']
    end

    add_replica "Post_#{ENV['ALGOLIA_ENVIRONMENT']}_latest", inherit: true, per_environment: true do
      customRanking ['desc(created_at)']
    end
  end

  def share_url
    return "https://#{ENV['DOMAIN_NAME']}/conversations/#{self.id}"
  end

  def formatted_content
    return simple_format(self.content)
  end

  def top_response
    Rails.cache.fetch("posts/top_response/#{self.cache_key_with_version}") do
      self.responses.thanked.order(cached_weighted_score: :desc).order(:created_at).first
    end
  end

  def author_active?
    self.author.active?
  end

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

  def check_content
    self.update(status: :processing)
    ProcessContentWorker.perform_async(self.id, 'post', self.content)
  end
end
