Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :players 
      resources :quotes 
      post "/players/:name/check", to: "players#check"
      patch "/players/:name/win", to: "players#win"
      patch "/players/:name/newGame", to: "players#newGame"
      # get "/quotes", to: "quotes#index"
    end
  end
end
