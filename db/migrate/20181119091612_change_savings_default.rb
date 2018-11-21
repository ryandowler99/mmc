class ChangeSavingsDefault < ActiveRecord::Migration
  def up
	change_column :budgets, :savings, :decimal, :default => 0.0
  end
end
