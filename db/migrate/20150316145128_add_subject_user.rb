class AddSubjectUser < ActiveRecord::Migration
  def change
    add_column :subjects, :user_id, :integer
  end
end
