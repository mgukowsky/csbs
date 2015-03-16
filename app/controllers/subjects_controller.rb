class SubjectsController < ApplicationController
  def create
    @subject = Subject.new(subject_params)
    @subject.user_id = current_user.id
    @subject.save
    render json: @subject
  end


  private

  def subject_params
    params.require(:subject).permit(:title)
  end
end
