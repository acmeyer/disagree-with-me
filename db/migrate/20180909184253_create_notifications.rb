class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :user
      t.references :notifiable, polymorphic: true, index: true
      t.string :message
      t.integer :notification_type
      t.integer :status

      t.timestamps
    end
  end
end
