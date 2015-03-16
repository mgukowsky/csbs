class ChangeDecksColumns < ActiveRecord::Migration
  def change
    add_column :decks, :subject_id, :integer
  end
end
