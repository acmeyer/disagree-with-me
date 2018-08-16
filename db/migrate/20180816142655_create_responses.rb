class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.text :content
      t.references :user
      t.references :post
      t.boolean :author_thanked, default: false

      t.timestamps
    end
  end
end
