class AddDefaultValueToMatches < ActiveRecord::Migration
  def change
    change_column :matches, :alerted, :boolean, :default => false
  end
end
