class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?

  def current_user
    return nil unless session[:token]
    @current_user = User.find_by_session_token(session[:token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in!(user)
    @current_user = user
    session[:token] = user.reset_token!
  end

  def sign_out!
    current_user.reset_token!
    session[:token] = nil
  end

  def require_signed_in!
    unless signed_in?
      flash[:errors] = ["You need to be signed in to go there"]
      redirect_to new_session_url
    end
  end

  def require_matching_id
    unless params[:id].to_i == current_user.id
      flash[:errors] = ["You can only view and change information linked to your account"]
      redirect_to user_url(current_user)
    end
  end
end
