class Api::DecksController < ApplicationController
  # before_action :require_signed_in!,
                # :require_matching_id,
                #   only: [:edit, :update, :destroy]

  def index
    if params[:get_current_user_decks]
      @decks = current_user.decks
    elsif params[:user_id]
      @decks = User.find(params[:user_id]).decks
    else
      @decks = Deck.all
    end
    render :index
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def new
    #probably won't need
    @deck = Deck.new
  end

  def create
    @deck = Deck.new(deck_params)
    @deck.owner_id = current_user.id.to_i
    if @deck.save
      render json: @deck
    else
      flash.now[:errors] = @deck.errors.full_messages
      render json: @deck
    end
  end

  def edit
    #probably won't need
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:id])
    if @deck.update(deck_params)
      render json: @deck
    else
      flash.now[:errors] = @deck.errors.full_messages
      render json: @deck
    end
  end

  def destroy
    @deck = Deck.find(params[:id])
    @deck.destroy
    render json: @deck
  end

  def search
    #functionality temporarily on hold
    @user_id = params[:seach_user_id]
    redirect_to user_decks_url(@user_id)
  end

  private

  def deck_params
    parse_is_private
    params.require(:deck).permit(:title, :owner_id, :topic_id, :is_private)
  end

  def parse_is_private
    if params[:deck][:private] == "T"
      params[:deck][:private] = true
    elsif params[:deck][:private] == "F"
      params[:deck][:private] = false
    end
  end
end
