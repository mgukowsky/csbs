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

ActiveRecord::Schema.define(version: 20150317175952) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "decks", force: true do |t|
    t.integer  "owner_id",                  null: false
    t.string   "title",                     null: false
    t.boolean  "is_private", default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "subject_id"
  end

  add_index "decks", ["title"], name: "index_decks_on_title", using: :btree

  create_table "flashcards", force: true do |t|
    t.integer  "deck_id",    null: false
    t.text     "question",   null: false
    t.text     "answer",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "mastery"
  end

  create_table "statistics", force: true do |t|
    t.string   "title"
    t.integer  "mastery"
    t.integer  "app_statistic_id"
    t.string   "app_statistic_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "statistics", ["app_statistic_id", "app_statistic_type"], name: "index_statistics_on_app_statistic_id_and_app_statistic_type", using: :btree

  create_table "subjects", force: true do |t|
    t.string   "title",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "session_token"
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username", "email", "session_token"], name: "index_users_on_username_and_email_and_session_token", unique: true, using: :btree

end
