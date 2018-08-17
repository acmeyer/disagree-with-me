Rails.application.routes.draw do
  devise_for :users#, controllers: { sessions: 'users/sessions' }
  
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

        # resources :posts do
        #   resources :responses
        # end
      end
    end
  end
  
  root to: "home#index"
end
