Csbs.Views.DeckShow = Backbone.View.extend ({
  template: JST["decks/_deck_show"],

  initialize: function(options) {
    this.deck = options.deck;
  },

  render: function () {
    var content = this.template({deck: this.deck});
    this.$el.html(content);
    return this;
  }
})
