class CreateQuotes < ActiveRecord::Migration[6.0]
  def change
    create_table :quotes do |t|
      t.string :quote
      t.string :author
      t.string :category

      t.timestamps
    end
  end
end
