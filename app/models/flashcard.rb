class Flashcard < ActiveRecord::Base
  validates :deck_id, :question, :answer, presence: true

  belongs_to(
    :deck,
    class_name: "Deck",
    primary_key: :id,
    foreign_key: :deck_id
  )

  has_one(
    :author,
    through: :deck,
    source: :user
  )
end
