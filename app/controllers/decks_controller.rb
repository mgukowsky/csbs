class DecksController < ApplicationController
  def index
    @deck_owner = User.find(params[:user_id].to_i)
    @current_decks = @deck_owner.decks
    render :index
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def new
    @deck = Deck.new
  end

  def create
    @deck = Deck.new(deck_params)
    @deck.owner_id = current_user.id.to_i
    if @deck.save
      flash[:notice] = ["New deck created successfully!"]
      redirect_to user_decks_url(current_user.id)
    else
      flash.now[:errors] = @deck.errors.full_messages
      render :new
    end
  end

  def edit
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:id])
    if @deck.update(deck_params)
      flash[:notice] = ["Deck updated successfully!"]
      redirect_to user_decks_url(current_user.id)
    else
      flash.now[:errors] = @deck.errors.full_messages
      render :edit
    end
  end

  def destroy
    @deck = Deck.find(params[:id])
    @deck.destroy
    flash[:notice] = ["Deck deleted successfully!"]
    redirect_to user_decks_url(current_user.id)
  end


  private

  def deck_params
    params.require(:deck).permit(:title, :owner_id, :topic_id, :private)
  end
end
