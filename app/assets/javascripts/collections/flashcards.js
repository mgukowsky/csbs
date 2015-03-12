Csbs.Collections.Flashcards = Backbone.Collection.extend({
  url: '/api/flashcards',
  model: Csbs.Models.Flashcard,

  parse: function (response) {
    this.isCurrentUser = response.is_current_user
    this.authorId = response.author_id

    return response.flashcards
  }
})
