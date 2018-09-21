Rails.application.routes.draw do
  # Devise routes
  devise_for :users, only: [:passwords], controllers: {
    passwords: 'users/passwords'
  }
  get 'users/password_changed', to: 'auth#password_changed'

  
  # API routes
  constraints subdomain: 'api' do
    scope module: :api, defaults: {format: :json} do
      namespace :v1 do
        # Auth routes
        post 'auth/signin', to: 'auth#signin'
        post 'auth/signup', to: 'auth#signup'
        post 'auth/send_reset_password_instructions', to: 'auth#send_reset_password_instructions'

        # Search
        post 'search', to: 'search#index'

        # User routes
        get 'users/me', to: 'users#me'
        put 'users/change_password', to: 'users#change_password'
        get 'users/my_posts', to: 'users#my_posts'
        get 'users/my_responses', to: 'users#my_responses'
        get 'users/my_bookmarks', to: 'users#my_bookmarks'
        get 'users/my_thanks', to: 'users#my_thanks'
        get 'users/my_post_upvotes', to: 'users#my_post_upvotes'
        get 'users/my_response_upvotes', to: 'users#my_response_upvotes'
        post 'users/my_notifications_settings', to: 'user#my_notifications_settings'

        resources :posts, only: [:index, :show, :create] do
          resources :responses, only: [:index, :show, :create] do
            member do
              post 'toggle_upvote'
              post 'thank'
            end
          end
          member do
            post 'toggle_upvote'
            post 'toggle_bookmark'
          end
        end

        resources :reports, only: [:create]

        resources :notifications, only: [:index] do
          collection do
            post 'mark_all_read'
          end
          member do
            post 'mark_read'
            post 'mark_unread'
            post 'delete'
          end
        end
      end
    end
  end

  # Error routes
  match '/404', to: 'errors#file_not_found', via: :all
  match '/500', to: 'errors#internal_server_error', via: :all
  match '/401', to: 'errors#error_401', via: :all

  # Web App routes
  get "activity/:list", to: "web_app#index"
  get "login", to: "web_app#index"
  get "signup", to: "web_app#index"
  get "reset_password", to: "web_app#index"
  get "conversations/:post_id", to: "web_app#index", as: 'conversation'
  get "bookmarks", to: "web_app#index"
  get "me/:route", to: "web_app#index", as: 'user'
  get "about", to: "web_app#index"
  get "terms", to: "web_app#index"
  get "privacy", to: "web_app#index"
  root to: "web_app#index"
end
