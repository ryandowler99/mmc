class PagesController < ApplicationController
	before_filter :authenticate_user!

  def home
  end

  def about
  end

  def front
  end

  def profile
  	 if user_signed_in?
      #get the orgs belloning to the user
      @user = current_user
      @users_budgets = Budget.where(["user_id = ?", @user.id])
      @budgets = Budget.all
   end
  end

  def store
    @iframe_games = IframeGame.all
  end

  def calculator
  end 
  
  def ux_testing_view
    @users = User.where("email LIKE :prefix", prefix: "user%")
    @budgets = Budget.all
  end

end
