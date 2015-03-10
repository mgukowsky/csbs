class CreateDecks < ActiveRecord::Migration
  def change
     create_table :decks do |t|
       t.integer :owner_id, null: false
       t.integer :topic_id
       t.string :title, null: false
       t.boolean :private, default: true

       t.timestamps
     end

     add_index :decks, :title
  end
end
