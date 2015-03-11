class SessionsController < ApplicationController

  def new
    if current_user
      redirect_to user_url(current_user)
    end
  end

  def create
    @user = User.find_by_credentials(params[:user])

    if @user
      sign_in!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Invalid credentials"]
      render :new
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end
end
