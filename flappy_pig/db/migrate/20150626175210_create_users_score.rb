class CreateUsersScore < ActiveRecord::Migration
  def change
    create_table :users_scores do |t|
      t.string :name, null: false
      t.integer :score, null: false
    end
  end
end
