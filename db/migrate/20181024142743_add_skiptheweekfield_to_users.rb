class AddSkiptheweekfieldToUsers < ActiveRecord::Migration
  def change
    add_column :users, :skiptheweekfield, :boolean
  end
end
