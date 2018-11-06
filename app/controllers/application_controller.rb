class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :authenticate_user! 

  def hello
  	render text: "Hello worldo!!"
  end

  before_filter :get_current_user

  def get_current_user
  	 if user_signed_in?
      #get the orgs belloning to the user
      @user = current_user
   end
  end
      
end
