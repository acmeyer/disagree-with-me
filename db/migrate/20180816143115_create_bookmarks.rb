class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.references :post
      t.references :user
      t.index [:user_id, :post_id], unique: true

      t.timestamps
    end
  end
end
