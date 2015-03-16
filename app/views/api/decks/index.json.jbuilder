# public_decks = @decks.select{ |deck| deck.is_private && deck.user != current_user }


# (@decks.empty?) ? @decks << @user.decks.new : @decks

json.array! @decks do |deck|
  json.extract! deck, :id, :title, :owner_id,:is_private, :flashcards, :user, :subject_id, :subject
  json.is_current_user deck.user == current_user
  json.author_id deck.user.id
end
