class CreateAuthTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :auth_tokens do |t|
      t.string :token
      t.references :user
      t.datetime :last_used_at
      t.datetime :expires_at
      t.string :user_agent
      t.inet :ip_address
      t.index :token

      t.timestamps
    end
  end
end
