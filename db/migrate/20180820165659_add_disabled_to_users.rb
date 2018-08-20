class AddDisabledToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :disabled, :bool, default: false
  end
end
