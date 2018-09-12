class Thank < ApplicationRecord
  belongs_to :user
  belongs_to :response

  validates_uniqueness_of :user_id, scope: :response_id

  after_create :update_response, :send_author_notification, :send_followers_notification

  private
  def update_response
    self.response.update(author_thanked: true)
  end

  def send_author_notification
    Notification.create(
      message: I18n.t('notifications.messages.thanked_response', response_truncated: self.response.content.truncate(75), post_truncated: self.response.post.content.truncate(75)),
      user_id: self.response.author.id,
      notification_type: 'Response Thanked',
      notifiable: self.response,
    )
  end

  def send_followers_notification
    Bookmark.where(post_id: self.response.post.id).each do |bookmark|
      Notification.create(
        message: I18n.t('notifications.messages.new_response_to_bookmarked', response_truncated: bookmark.post.content.truncate(75)),
        user_id: bookmark.user.id,
        notification_type: 'New Thanked Response',
        notifiable: bookmark.post,
      )
    end
  end
end
