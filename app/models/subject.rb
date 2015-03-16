class Subject < ActiveRecord::Base
  validates :title, presence: true

  has_many(
    :decks,
    class_name: "Deck",
    primary_key: :id,
    foreign_key: :subject_id
  )

  belongs_to(
    :user,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id
  )
end
