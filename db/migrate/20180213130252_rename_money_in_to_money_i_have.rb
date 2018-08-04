class RenameMoneyInToMoneyIHave < ActiveRecord::Migration
  def change
  	rename_column :budgets, :money_in, :money_i_have
  end
end
