class CreateNotificationsSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications_settings do |t|
      t.references :user
      t.boolean :new_response_email, default: true
      t.boolean :response_thanked_email, default: true
      t.boolean :new_thanked_email, default: true
      t.boolean :new_upvote_email, default: true

      t.timestamps
    end

    User.all.each do |user|
      NotificationsSetting.create(user_id: user.id)
    end
  end
end
