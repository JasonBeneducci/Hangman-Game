class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :total_games, :default => 0
      t.integer :total_wins, :default => 0

      t.timestamps
    end
  end
end
