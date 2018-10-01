require  'sidekiq/web'

Rails.application.routes.draw do
  # Devise routes
  devise_for :users, only: [:passwords, :confirmations], controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }
  get 'users/password_changed', to: 'auth#password_changed'
  get 'users/email_confirmed', to: 'auth#email_confirmed'
  
  # API routes
  constraints subdomain: 'api' do
    scope module: :api, defaults: {format: :json} do
      namespace :v1 do
        # Auth routes
        post 'auth/oauth', to: 'auth#oauth'
        post 'auth/signin', to: 'auth#signin'
        post 'auth/signup', to: 'auth#signup'
        post 'auth/send_reset_password_instructions', to: 'auth#send_reset_password_instructions'
        post 'auth/resend_confirmation_email', to: 'auth#resend_confirmation_email'

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
        post 'users/my_notifications_settings', to: 'users#my_notifications_settings'

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

  # Admin routes
  constraints subdomain: 'admin' do
    namespace :admin, path: '/' do
      # Devise routes
      devise_for :users, only: [:sessions], controllers: {
        sessions: 'admin/sessions'
      }

      resources :users do
        member do
          post 'disable'
          post 'enable'
        end

        resources :auth_tokens, except: [:index, :new, :create, :edit, :update] do
          member do
            post 'expire'
          end
        end
      end

      get 'responses', to: 'responses#index'
      resources :posts, except: [:new, :create] do
        resources :responses, except: [:index, :new, :create]
      end

      resources :reports, except: [:new, :create]

      get 'tags', to: 'tags#index'
      get 'tags/:name', to: 'tags#show', as: "tag"

      # Ensure only admins can view these pages
      authenticate :admin_user, lambda { |u| u.admin? } do
        mount Sidekiq::Web => '/sidekiq'
      end

      root to: 'dashboard#index'
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
  get "me/:route", to: "web_app#index", as: 'me'
  get "notification_settings", to: "web_app#index", as: 'notification_settings'
  get "about", to: "web_app#index"
  get "latest", to: "web_app#index"
  get "popular", to: "web_app#index"
  get "terms", to: "web_app#index"
  get "privacy", to: "web_app#index"
  root to: "web_app#index"
end
