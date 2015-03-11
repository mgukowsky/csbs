Csbs.Collections.Flashcards = Backbone.Collection.extend({
  url: '/api/flashcards',
  model: Csbs.Models.Flashcard,

  // initialize: function(options) {
  //   this.deck = options.deck
  // }
})
