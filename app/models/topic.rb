class Topic < ApplicationRecord
  has_many :posts

  validates :title, presence: true, uniqueness: true

  include PgSearch
  pg_search_scope :search_topics, :against => [:title]
end
