web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -q default -q mailers
release: rails db:migrate