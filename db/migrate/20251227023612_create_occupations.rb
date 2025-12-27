class CreateOccupations < ActiveRecord::Migration[8.1]
  def change
    create_table :occupations do |t|
      t.string :name, null: false, comment: "職業名"
      t.timestamps
    end
  end
end
