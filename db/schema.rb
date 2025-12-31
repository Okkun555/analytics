# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_31_113516) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "asset_balances", force: :cascade do |t|
    t.integer "amount", default: 0, null: false, comment: "合計額"
    t.bigint "asset_category_id", null: false, comment: "資産カテゴリID"
    t.datetime "created_at", null: false
    t.date "date", null: false, comment: "対象月"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false, comment: "ユーザーID"
    t.index ["asset_category_id"], name: "index_asset_balances_on_asset_category_id"
    t.index ["user_id", "date", "asset_category_id"], name: "index_asset_balances_on_user_id_and_date_and_asset_category_id", unique: true
    t.index ["user_id", "date"], name: "index_asset_balances_on_user_id_and_date"
    t.index ["user_id"], name: "index_asset_balances_on_user_id"
  end

  create_table "asset_categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", limit: 100, null: false, comment: "資産カテゴリ名"
    t.datetime "updated_at", null: false
  end

  create_table "occupations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false, comment: "職業名"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.date "birthday", null: false, comment: "生年月日"
    t.datetime "created_at", null: false
    t.string "name", limit: 100, null: false, comment: "ユーザー名"
    t.bigint "occupation_id", null: false, comment: "職種ID"
    t.integer "sex", limit: 2, null: false, comment: "性別"
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["occupation_id"], name: "index_users_on_occupation_id"
  end

  add_foreign_key "asset_balances", "asset_categories"
  add_foreign_key "asset_balances", "users"
  add_foreign_key "users", "occupations"
end
