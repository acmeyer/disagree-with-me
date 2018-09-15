class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :post, touch: true

  validates_uniqueness_of :user_id, scope: :post_id
end
