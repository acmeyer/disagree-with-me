class Response < ApplicationRecord
  acts_as_paranoid
  acts_as_votable

  belongs_to :post, counter_cache: true, touch: true
  belongs_to :author, class_name: "User", foreign_key: :user_id
  has_many :reports, as: :reportable, dependent: :destroy

  validates :content, presence: true

  after_create :create_notification

  scope :thanked, -> { where(author_thanked: true) }
  scope :not_thanked, -> { where(author_thanked: false) }

  private
  def create_notification
    Notification.create(
      message: I18n.t('notifications.messages.new_response', post_truncated: self.post.content.truncate(75)),
      user_id: self.post.author.id,
      notification_type: 'New Response',
      notifiable: self,
    )
  end
end
