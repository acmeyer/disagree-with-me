class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

  acts_as_paranoid
  acts_as_voter

  has_many :auth_tokens
  has_many :posts, dependent: :destroy
  has_many :responses, dependent: :destroy
  has_many :thanks, dependent: :destroy
  has_many :thanked_responses, through: :thanks, source: :response
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post

  after_save :expire_tokens, if: Proc.new { |user| user.saved_change_to_encrypted_password? }
  after_initialize :set_default_role, :if => :new_record?

  enum role: [:user, :admin]

  # after_create :add_to_marketing_email_list
  # before_destroy :remove_from_email_lists

  def responded_to_post?(post_id)
    self.responses.pluck(:post_id).include?(post_id)
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

  # def add_to_marketing_email_list
  #   begin
  #     mailchimp = Gibbon::Request.new
  #     mailchimp.lists(ENV['MAILCHIMP_MARKETING_LIST_ID']).members.create(
  #       body: {
  #         email_address: self.email,
  #         merge_fields: {FNAME: self.first_name, LNAME: self.last_name},
  #         status: "subscribed"
  #       }
  #     )
  #   rescue Exception
  #     STDERR.puts("Error while adding user to Mailchimp marketing list: #{$!}")
  #   end
  # end

  # def remove_from_email_lists
  #   begin
  #     mailchimp = Gibbon::Request.new
  #     mailchimp.lists(ENV['MAILCHIMP_MARKETING_LIST_ID']).members(Digest::MD5.hexdigest(self.email)).update(body: { status: "unsubscribed" })
  #   rescue Exception
  #     STDERR.puts("Error while adding user to Mailchimp marketing list: #{$!}")
  #   end
  # end
end
