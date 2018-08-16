class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

  acts_as_voter
  has_many :posts, dependent: :destroy
  has_many :responses, dependent: :destroy
  has_many :thanks, dependent: :destroy
  has_many :thanked_responses, through: :thanks, source: :response
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post
end
