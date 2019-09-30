class Api::V1::PlayerController < ApplicationController


  def update
    if Player.find_by(name: params[:name])
      player = Player.find_by(name: params[:name])
      player.update(games_played: player.total_games + 1)
      render json: player
    else
      player = Player.new(name: params[:name])
      player.update(games_played: player.total_games + 1)
      render json: player
    end
  end

  def win
    player = Player.find_by(name: params[:name])
    player.update(games_played: player.total_wins + 1
    render json: player

  end

  private

  def playter_params
    params.require(:player).permit(:name, :games_played, :total_wins)
  end
end