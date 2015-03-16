class Api::DecksController < ApplicationController
  # before_action :require_signed_in!,
                # :require_matching_id,
                #   only: [:edit, :update, :destroy]

  #Index is also used for user search
  def index
    if params[:get_current_user_decks]
      @decks = current_user.decks
    elsif params[:user_id] && params[:subject_id]
      @decks = User.find(params[:user_id]).decks
      @decks = @decks.select {|deck| deck.subject_id == params[:subject_id]}
    elsif params[:user_id]
      @decks = User.find(params[:user_id]).decks
    else
      @decks = Deck.all
    end
    @user = User.find(params[:user_id])
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

  #used for subject search
  # def search
  #   @query = params[:subject_name]
  #   @query_length = @query.length
  #   @topics = Subject.where("title ~* ?", @query)
  #   @topics.select(|topic| topic
  #                           .title
  #                           .length
  #                           .between?(@query_length - 2, @query_length + 2))
  #   render :index
  # end

  private

  def deck_params
    parse_is_private
    params.require(:deck).permit(:title, :owner_id, :subject_id, :is_private)
  end

  def parse_is_private
    if params[:deck][:private] == "T"
      params[:deck][:private] = true
    elsif params[:deck][:private] == "F"
      params[:deck][:private] = false
    end
  end
end
