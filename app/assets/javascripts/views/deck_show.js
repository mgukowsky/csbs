Csbs.Views.DeckShow = Backbone.View.extend ({
  template: JST["decks/_deck_show"],
  tagName: "ul",
  className: "deck-info",

  initialize: function(options) {
    this.deck = options.deck;
  },

  render: function () {
    var content = this.template({deck: this.deck});
    this.$el.attr("data-id", this.deck.id);
    this.$el.html(content);
    return this;
  }
})
