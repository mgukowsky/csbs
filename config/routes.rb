Csbs::Application.routes.draw do
  root to: "sessions#new"
  resources :users do
    get 'subjects', :to => 'users#user_subjects'
  end

  post 'post_subject', :to => 'subjects#create'

  resource :session, only: [:new, :create, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :decks
    get 'deck_search', :to => 'decks#search'
    resources :flashcards
  end
end
