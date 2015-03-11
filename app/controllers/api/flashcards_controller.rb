class Api::FlashcardsController < ApplicationController
  # before_action :require_signed_in!

  def index
    @deck = Deck.find(params[:deck_id])
    render :index
  end

  def show
    @flashcard = Flashcard.find(params[:id])
    render json: @flashcard
  end

  def new
    @flashcard = Flashcard.new
    render json: @flashcard
  end

  def create
    @flashcard = Flashcard.new(flashcard_params)

    if @flashcard.save
      flash[:notice] = ["Flashcard created successfully!"]
    else
      flash[:errors] = @flashcard.errors.full_messages
    end
  end

  def edit
    @flashcard = Flashcard.find(params[:id])
    render json: @flashcard
  end

  def update
    @flashcard = Flashcard.find(params[:id])

    if @flashcard.update(flashcard_params)
      flash[:notice] = ["Flashcard updated successfully!"]
    else
      flash[:errors] = @flashcard.errors.full_messages
    end
  end

  def destroy
    @flashcard = Flashcard.find(params[:id])
    @flashcard.destroy
  end


  private

  def flashcard_params
    params.require(:flashcard).permit(:deck_id, :question, :answer)
  end
end
