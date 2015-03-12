Csbs::Application.routes.draw do
  root to: "sessions#new"
  resources :users

  resource :session, only: [:new, :create, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :decks
    get 'deck_search', :to => 'decks#search'
    resources :flashcards
  end
end
