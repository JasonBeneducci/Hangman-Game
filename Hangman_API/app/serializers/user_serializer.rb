class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_games, :total_wins
end
