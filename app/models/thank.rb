class Thank < ApplicationRecord
  belongs_to :user
  belongs_to :response

  validates_uniqueness_of :user_id, scope: :response_id

  after_create :update_response

  private
  def update_response
    self.response.update(author_thanked: true)
  end
end
