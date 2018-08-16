class CreateThanks < ActiveRecord::Migration[5.2]
  def change
    create_table :thanks do |t|
      t.references :user
      t.references :response

      t.timestamps
    end
  end
end
