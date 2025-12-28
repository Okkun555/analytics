class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :name, null: false, limit: 100, comment: "ユーザー名"
      t.date :birthday, null: false, comment: "生年月日"
      t.integer :sex, null: false, limit: 2, comment: "性別"
      t.references :occupation, null: false, foreign_key: true, comment: '職種ID'

      t.timestamps
    end

    add_index :users, :name, unique: true
  end
end
