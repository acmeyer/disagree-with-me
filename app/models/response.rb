class Response < ApplicationRecord
  acts_as_paranoid
  acts_as_votable

  belongs_to :post, counter_cache: true, touch: true
  belongs_to :author, class_name: "User", foreign_key: :user_id
  has_many :reports, as: :reportable, dependent: :destroy

  validates :content, presence: true

  scope :thanked, -> { where(author_thanked: true) }
  scope :not_thanked, -> { where(author_thanked: false) }
end
