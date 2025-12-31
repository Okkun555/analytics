class CreateAssetBalances < ActiveRecord::Migration[8.1]
  def change
    create_table :asset_balances do |t|
      t.references :user, null: false, foreign_key: true, comment: "ユーザーID"
      t.references :asset_category, null: false, foreign_key: true, comment: "資産カテゴリID"
      t.date :date, null: false, comment: "対象月"
      t.integer :amount, null: false, default: 0, comment: '合計額'
      t.timestamps
    end

    add_index :asset_balances, %i[user_id date asset_category_id], unique: true
    add_index :asset_balances, %i[user_id date]
  end
end
