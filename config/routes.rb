Rails.application.routes.draw do
  get "react", to: redirect("/react/"), constraints: ->(req) {
      req.original_url.last != "/"
    }

  # All requests to `/react/*` are handled by ReactController#show.
  match "react", to: "react#show", via: :all
  get "react/*path", to: "react#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :users, only: %i[create]
  end
end
