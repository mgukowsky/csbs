class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.string :title
      t.integer :mastery
      t.references :app_statistic, polymorphic: true, index: true

      t.timestamps
    end
  end
end
