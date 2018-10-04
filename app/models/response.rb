class Response < ApplicationRecord
  include ActionView::Helpers::TextHelper

  acts_as_paranoid
  acts_as_votable

  belongs_to :post, counter_cache: true, touch: true
  belongs_to :author, class_name: "User", foreign_key: :user_id
  has_many :reports, as: :reportable, dependent: :destroy

  validates :content, presence: true

  after_create :check_content
  after_save :create_notifications, if: Proc.new { |response| response.saved_change_to_status? && response.appropriate? }

  enum status: [:processing, :inappropriate, :appropriate, :needs_review]

  scope :thanked, -> { where(author_thanked: true) }
  scope :not_thanked, -> { where(author_thanked: false) }
  scope :upvoted, -> { where('cached_weighted_score > ?', 0) }
  scope :approved, -> { where(status: :appropriate) }
  scope :not_approved, -> { where.not(status: :appropriate) }
  scope :pending_review, -> { where(status: :needs_review) }

  include PgSearch
  pg_search_scope :search_responses, :against => [:content]

  def formatted_content
    return simple_format(self.content)
  end

  private
  def create_notifications
    # Send notification to original post's author
    Notification.create(
      message: I18n.t('notifications.messages.new_response', post_truncated: self.post.content.truncate(75)),
      user_id: self.post.author.id,
      notification_type: 'New Response',
      notifiable: self,
    )
  end

  def check_content
    self.update(status: :processing)
    ProcessContentWorker.perform_async(self.id, 'response', self.content)
  end
end
