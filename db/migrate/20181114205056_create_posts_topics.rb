class CreatePostsTopics < ActiveRecord::Migration[5.2]
  def up
    create_table :posts_topics do |t|
      t.references :post
      t.references :topic

      t.timestamps
    end

    Topic.all.each do |topic|
      topic.posts.each do |post|
        PostsTopic.create(post_id: post.id, topic_id: topic.id)
      end
    end

    remove_index :posts, :topic_id
    remove_column :posts, :topic_id
  end

  def down
    add_column :posts, :topic_id, :bigint
    add_index :posts, :topic_id

    PostsTopic.all.each do |pt|
      pt.post.topic_id = pt.topic.id
      pt.save
    end

    drop_table :posts_topics
  end
end
