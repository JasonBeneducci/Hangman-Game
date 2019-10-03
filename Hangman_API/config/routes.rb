Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      # resources :players 
      resources :quotes 
      get "/players/:name/check", to: "players#check"
      patch "/players/:name/newGame", to: "players#newGame"
      patch "/players/:name/win", to: "players#win"
      # get "/quotes", to: "quotes#index"
    end
  end
end
