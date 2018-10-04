class AddStatusToPostsAndResponses < ActiveRecord::Migration[5.2]
  def up
    add_column :posts, :status, :integer
    add_column :responses, :status, :integer

    Post.all.update_all status: :appropriate
    Response.all.update_all status: :appropriate
  end

  def down
    remove_column :posts, :status
    remove_column :responses, :status
  end
end
