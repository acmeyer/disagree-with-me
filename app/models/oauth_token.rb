class OauthToken < ApplicationRecord
  belongs_to :user, touch: true
end
