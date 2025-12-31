class CreateAssetCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :asset_categories do |t|
      t.string :name, null: false, limit: 100, comment: '資産カテゴリ名'
      t.timestamps
    end
  end
end
