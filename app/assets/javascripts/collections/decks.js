Csbs.Collections.Decks = Backbone.Collection.extend({
  url: '/api/decks',
  model: Csbs.Models.Deck,

  parse: function (response) {
    this.username = response[0].user.username;
    this.isCurrentUser = response.is_current_user;
    this.authorId = response.author_id

    return response
  }
})
