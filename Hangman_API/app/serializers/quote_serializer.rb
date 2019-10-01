class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :quote, :author, :category
end
