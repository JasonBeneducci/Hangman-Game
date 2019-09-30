class GameResult < ApplicationRecord
  belongs_to :quote
  belongs_to :player
end
