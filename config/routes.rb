Rails.application.routes.draw do
  devise_for :users#, controllers: { sessions: 'users/sessions' }
  
  constraints subdomain: 'api' do
    namespace :api, defaults: {format: :json} do
      namespace :v1 do
        resources :posts do
          resources :responses
        end

        resources :users, only: [:show] do
          resources :posts, only: [:index]
          resources :responses, only: [:index]
          member do
            get :bookmarks
            get :thanks
            get :upvotes
          end
        end
      end
    end
  end
  
  root to: "home#index"
end
