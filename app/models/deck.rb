class Deck < ActiveRecord::Base
  validates :title, :owner_id, presence: true

  has_many(
    :flashcards,
    class_name: "Flashcard",
    primary_key: :id,
    foreign_key: :deck_id
  )

  belongs_to(
    :user,
    class_name: "User",
    primary_key: :id,
    foreign_key: :owner_id
  )
end
