class Bookmark < ApplicationRecord
  belongs_to :user, touch: true
  belongs_to :post

  validates_uniqueness_of :user_id, scope: :post_id
end
