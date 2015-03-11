class CreateFlashcards < ActiveRecord::Migration
  def change
    create_table :flashcards do |t|
      t.integer :deck_id, null: false
      t.text :question, null: false
      t.text :answer, null: false

      t.timestamps
    end
  end
end
