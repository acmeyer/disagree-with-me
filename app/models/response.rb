class Response < ApplicationRecord
  acts_as_votable
  belongs_to :post, counter_cache: true
  belongs_to :author, class_name: "User", foreign_key: :user_id
end
