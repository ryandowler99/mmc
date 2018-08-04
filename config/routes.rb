Rails.application.routes.draw do

  resources :iframe_games
  resources :videos
get 'budgets/before_new'

resources :budgets do
  collection do
    put :update_attribute_on_the_spot
    get :get_attribute_on_the_spot
  end
end

get 'pages/home'
get 'pages/about'
get 'pages/front'
get 'pages/profile'
get 'pages/store'
get 'pages/calculator'
get 'pages/ux_testing_view'
# get 'pages/videos'



#devise_for :users
devise_for :users, :controllers => { registrations: 'registrations' }, :path_names => {:sign_up => "register"}
# The priority is based upon order of creation: first created -> highest priority.
# See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'pages#front'

  # Example of regular route:
 

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
