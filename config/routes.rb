Csbs::Application.routes.draw do
  root to: "sessions#new"
  resources :users do
    resources :decks
  end
  resource :session, only: [:new, :create, :destroy]
  get 'deck_search', :to => 'decks#search'

end
