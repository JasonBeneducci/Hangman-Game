Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :players 
      resources :quotes 
      patch "/players/:id/update", to: "players#update"
      patch "/players/:id/win", to: "players#win"
      # get "/quotes", to: "quotes#index"
    end
  end
end
