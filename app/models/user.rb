class User < ApplicationRecord
  # :registerable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

  acts_as_paranoid
  acts_as_voter

  has_many :auth_tokens, dependent: :destroy
  has_many :posts
  has_many :responses
  has_many :thanks, dependent: :destroy
  has_many :thanked_responses, through: :thanks, source: :response
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post
  has_many :reports
  has_many :notifications, dependent: :destroy

  after_save :expire_tokens, if: Proc.new { |user| user.saved_change_to_encrypted_password? }
  after_initialize :set_default_role, :if => :new_record?

  enum role: [:user, :admin]

  after_create :add_to_marketing_email_list
  before_destroy :remove_from_email_lists

  # needed because sidekiq could receive before the record finishes being added to the DB
  after_commit :send_welcome_email, on: :create

  def responded_to_post?(post_id)
    self.responses.pluck(:post_id).include?(post_id)
  end

  def bookmarked_post?(post_id)
    self.bookmarks.pluck(:post_id).include?(post_id)
  end

  def toggle_upvote!(resource)
    if self.voted_up_for?(resource)
      resource.unliked_by self
    else
      self.likes resource

      # Send notification to author
      Notification.create(
        message: I18n.t('notifications.messages.new_upvote', resource_type: resource.class.to_s.downcase, content_truncated: resource.content.truncate(75)),
        user_id: resource.author.id,
        notification_type: 'New Response',
        notifiable: resource,
      )
    end
  end

  def toggle_bookmark!(post)
    bookmark = self.bookmarks.find_by_post_id(post.id)
    if bookmark.blank?
      self.bookmarks.create!(post_id: post.id)
    else
      bookmark.destroy!
    end
  end

  def thank!(response)
    post = response.post
    if !response.author_thanked
      if post.user_id == self.id
        self.thanks.create!(response_id: response.id)
      else
        raise StandardError, I18n.t('models.errors.only_post_author', default: 'Only the post author can do this!')
      end
    else
      raise StandardError, I18n.t('models.errors.response_already_thanked', default: 'Response already thanked.')
    end
  end

  def active_for_authentication?
    super && !disabled
  end

  def inactive_message   
  	!disabled ? super : :disabled_account  
  end 

  private
  def set_default_role
    self.role ||= :user
  end
  
  def expire_tokens
    self.auth_tokens.update_all(expires_at: DateTime.now, updated_at: DateTime.now)
  end

  def add_to_marketing_email_list
    begin
      mailchimp = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'])
      mailchimp.lists(ENV['MAILCHIMP_MARKETING_LIST_ID']).members.create(
        body: {
          email_address: self.email,
          status: "subscribed"
        }
      )
    rescue Exception
      STDERR.puts("Error while adding user to Mailchimp marketing list: #{$!}")
    end
  end

  def remove_from_email_lists
    begin
      mailchimp = Gibbon::Request.new(api_key: ENV['MAILCHIMP_API_KEY'])
      mailchimp.lists(ENV['MAILCHIMP_MARKETING_LIST_ID']).members(Digest::MD5.hexdigest(self.email)).update(body: { status: "unsubscribed" })
    rescue Exception
      STDERR.puts("Error while adding user to Mailchimp marketing list: #{$!}")
    end
  end

  def send_welcome_email
    UserMailer.welcome_email(self.id).deliver_later
  end
end
