class PostsTopic < ApplicationRecord
  belongs_to :post
  belongs_to :topic

  validates_uniqueness_of :post_id, scope: :topic_id
end
