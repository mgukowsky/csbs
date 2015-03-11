class AddUserAndDeckIndices < ActiveRecord::Migration
  def change
    add_index :users, [:username, :email, :session_token], unique: true
  end
end
