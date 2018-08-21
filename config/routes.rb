Rails.application.routes.draw do
  # Devise routes
  devise_for :users, skip: [:registrations], controllers: {
    passwords: 'users/passwords',
    sessions: 'users/sessions'
  }

  
  # API routes
  constraints subdomain: 'api' do
    scope module: :api, defaults: {format: :json} do
      namespace :v1 do
        # Auth routes
        post 'auth/signin', to: 'auth#signin'
        # post 'auth/signup', to: 'auth#signup'

        # User routes
        get 'users/me', to: 'users#me'
        put 'users/change_password', to: 'users#change_password'
        get 'users/my_posts', to: 'users#my_posts'
        get 'users/my_responses', to: 'users#my_responses'
        get 'users/my_bookmarks', to: 'users#my_bookmarks'
        get 'users/my_thanks', to: 'users#my_thanks'
        get 'users/my_post_upvotes', to: 'users#my_post_upvotes'
        get 'users/my_response_upvotes', to: 'users#my_response_upvotes'

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
      end
    end
  end

  # Web App routes
  get "me", to: "web_app#user"
  root to: "web_app#index"
end
