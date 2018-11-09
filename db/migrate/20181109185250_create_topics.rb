class CreateTopics < ActiveRecord::Migration[5.2]
  def up
    create_table :topics do |t|
      t.string :title

      t.timestamps
    end

    add_column :posts, :topic_id, :bigint
    add_index :posts, :topic_id
  end

  def down
    drop_table :topics

    remove_column :posts, :topic_id
    remove_index :posts, :topic_id
  end
end
