class AddColumnFlashcards < ActiveRecord::Migration
  def change
    add_column :flashcards, :mastery, :integer
  end
end
