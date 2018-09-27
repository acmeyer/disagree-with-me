source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.1'

# Environment Variables
#============================
gem 'dotenv-rails', groups: [:development, :test]

# Data Libraries
#==============================
gem 'pg', '>= 0.18', '< 2.0'
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Server Libraries
#==============================
gem 'puma', '~> 3.11'
# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Helper Libraries
#=============================
gem 'devise'
gem 'acts_as_votable', '~> 0.11.1'
gem 'oj'
gem 'kaminari'
gem 'pundit'
gem 'google-cloud-language'
gem 'acts-as-taggable-on', '~> 6.0'
gem 'algoliasearch-rails'
gem 'acts_as_paranoid', '~> 0.6.0'
gem 'rack-cors', require: 'rack/cors'
gem 'rack-attack'
gem 'gibbon'
gem 'exception_notification'
gem 'sidekiq'
gem 'httparty'
gem 'newrelic_rpm'
gem 'premailer-rails'
gem 'pg_search'

# Frontend Libraries
#=============================
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails'
gem 'font-awesome-sass', '~> 5.2.0'
gem 'bootstrap', '~> 4.1.3'
gem 'haml'
gem "autoprefixer-rails"
gem 'webpacker', '~> 3.5'
gem 'react-rails'


# Development Libraries
#============================
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'meta_request'
  gem "letter_opener"
end

# Test Libraries
#===========================
group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'chromedriver-helper'
end

# Development and Test Libraries
#==========================
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end
