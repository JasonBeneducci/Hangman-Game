class Api::V1::QuotesController < ApplicationController

  def index
    quotes = Quote.all
    render json: quotes
  end


end
