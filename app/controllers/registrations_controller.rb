class RegistrationsController < Devise::RegistrationsController

private

  def sign_up_params
    params.require(:user).permit(:failed_attempts, :unlock_token, :locked_at, :skiptheweekfield, :profileimage, :first_name, :last_name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:failed_attempts, :unlock_token, :locked_at, :skiptheweekfield, :profileimage, :first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end
end
