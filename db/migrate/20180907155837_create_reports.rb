class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.references :user
      t.references :reportable, polymorphic: true, index: true
      t.integer :reason
      t.string :description
      t.integer :status

      t.timestamps
    end
  end
end
