Csbs::Application.routes.draw do
  root to: "sessions#new"
  resources :users, except: :index do
    resources :decks
  end
  resource :session, only: [:new, :create, :destroy]
end
