class Response < ApplicationRecord
  acts_as_paranoid
  acts_as_votable

  belongs_to :post, counter_cache: true
  belongs_to :author, class_name: "User", foreign_key: :user_id

  validates :content, presence: true
  validates :post, presence: true

  scope :thanked, -> { where(author_thanked: true) }
  scope :not_thanked, -> { where(author_thanked: false) }
end
