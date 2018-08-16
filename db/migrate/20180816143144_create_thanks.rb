class CreateThanks < ActiveRecord::Migration[5.2]
  def change
    create_table :thanks do |t|
      t.references :user
      t.references :response
      t.index [:user_id, :response_id], unique: true

      t.timestamps
    end
  end
end
