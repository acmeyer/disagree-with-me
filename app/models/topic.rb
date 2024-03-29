class Topic < ApplicationRecord
  has_many :posts_topics
  has_many :posts, through: :posts_topics

  validates :title, presence: true, uniqueness: true

  paginates_per 25

  include PgSearch
  pg_search_scope :search_topics, :against => [:title]
end
