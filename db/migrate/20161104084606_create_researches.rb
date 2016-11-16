class CreateResearches < ActiveRecord::Migration
  def change
    create_table(:researches) do |t|
      t.integer :month
      t.integer :day
      t.integer :num_users

      #t.timestamps null: false
    end
  end
end
