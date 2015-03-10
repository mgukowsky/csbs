class ChangeDecks < ActiveRecord::Migration
  def change
    rename_column :decks, :private, :is_private
  end
end
