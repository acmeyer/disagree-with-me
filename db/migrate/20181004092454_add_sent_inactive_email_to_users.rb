class AddSentInactiveEmailToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :sent_inactive_email, :boolean, default: false
  end
end
