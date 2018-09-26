class CreateOauthTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :oauth_tokens do |t|
      t.references :user
      t.string :provider
      t.string :uid
      t.string :token

      t.timestamps
    end
  end
end
