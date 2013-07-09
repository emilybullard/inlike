class AddAttrsToUserTable < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string
  	add_column :users, :name, :string
  	add_column :users, :birthday, :datetime
  	add_column :users, :location, :string
  	add_column :users, :gender, :string
  	add_column :users, :preference, :string
  end
end
