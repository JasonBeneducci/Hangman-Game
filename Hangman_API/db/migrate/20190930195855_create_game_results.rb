class CreateGameResults < ActiveRecord::Migration[6.0]
  def change
    create_table :game_results do |t|
      t.references :quote, null: false, foreign_key: true
      t.boolean :completed
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
