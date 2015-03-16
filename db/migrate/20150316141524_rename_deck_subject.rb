class RenameDeckSubject < ActiveRecord::Migration
  def change
    remove_column :decks, :topic_id
  end
end
