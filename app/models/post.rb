class Post < ApplicationRecord
  acts_as_votable
  belongs_to :author, class_name: "User", foreign_key: :user_id
  has_many :responses, dependent: :destroy
end
