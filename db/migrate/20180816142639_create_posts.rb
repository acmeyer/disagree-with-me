class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :content
      t.references :user
      t.integer :responses_count, default: 0

      t.timestamps
    end
  end
end
