# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181119091612) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "budgets", force: :cascade do |t|
    t.string   "title"
    t.decimal  "money_i_have"
    t.integer  "week"
    t.decimal  "savings",        default: 0.0
    t.decimal  "bills",          default: 0.0
    t.decimal  "lunches",        default: 0.0
    t.decimal  "phone",          default: 0.0
    t.decimal  "travel",         default: 0.0
    t.decimal  "clothing",       default: 0.0
    t.decimal  "activities",     default: 0.0
    t.decimal  "entertainment",  default: 0.0
    t.decimal  "emergency_fund", default: 0.0
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "user_id"
  end

  add_index "budgets", ["user_id"], name: "index_budgets_on_user_id", using: :btree

  create_table "iframe_games", force: :cascade do |t|
    t.string   "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "title"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                   default: "",    null: false
    t.string   "encrypted_password",      default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",           default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "authy_id"
    t.datetime "last_sign_in_with_authy"
    t.boolean  "authy_enabled",           default: false
    t.string   "profileimage"
    t.boolean  "skiptheweekfield"
    t.integer  "failed_attempts",         default: 0
    t.string   "unlock_token"
    t.datetime "locked_at"
  end

  add_index "users", ["authy_id"], name: "index_users_on_authy_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "videos", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.string   "link"
    t.string   "icon"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
  end

  add_foreign_key "budgets", "users"
end
