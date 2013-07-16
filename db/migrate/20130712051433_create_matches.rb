class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :admirer_id
      t.integer :admired_id
      t.boolean :alerted

      t.timestamps
    end
  end
end
