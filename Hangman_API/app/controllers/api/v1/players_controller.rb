class Api::V1::PlayersController < ApplicationController


  def check
    if Player.find_by(name: params[:name])
      player = Player.find_by(name: params[:name])
      render json: player
    else
      player = Player.create(name: params[:name])
      render json: player
    end
  end

  def newGame
    player = Player.find_by(name: params[:name])
    player.update(total_games: player.total_games + 1)
    render json: player
  end

  def win
    player = Player.find_by(name: params[:name])
    player.update(total_wins: player.total_wins + 1)
    render json: player
  end


  private

  def player_params
    params.require(:player).permit(:name, :games_played, :total_wins)
  end
end