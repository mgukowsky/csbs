json.extract! @deck, :id, :title, :owner_id, :topic_id, :is_private, :flashcards, :user
json.is_current_user @deck.user == current_user
json.author_id @deck.user.id
