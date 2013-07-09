class CreateDecisions < ActiveRecord::Migration
  def change
    create_table :decisions do |t|
      t.integer :decider_id
      t.integer :decided_id
      t.boolean :like

      t.timestamps
    end
  end
end
