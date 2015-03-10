Csbs::Application.routes.draw do
  resources :users, except: :index do
    resources :decks
  end
  resource :session, only: [:new, :create, :destroy]
end
