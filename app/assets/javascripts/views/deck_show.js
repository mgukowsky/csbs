Csbs.Views.DeckShow = Backbone.View.extend ({
  template: JST["decks/_deck_show"],
  tagName: "ul",
  className: "deck-info",

  initialize: function(options) {
    this.deck = options.deck;
  },

  events: {
    "click button.deck-study": "deckStudyPrompt"
  },

  render: function () {
    var content = this.template({deck: this.deck});
    this.$el.attr("data-id", this.deck.id);
    this.$el.html(content);
    return this;
  },

  deckStudyPrompt: function (event) {
    $("div.deck-study-options" + $(event.target).attr("data-id")).dialog({
      title: "How would you like to study this deck?",
      minWidth: 800,
      modal: true,
      show: {
        effect: "puff",
        duration: 500
      },
      close: function () {
        $("div.ui-dialog").remove()
      }.bind(this),
      hide: {
        effect: "explode",
        duration: 500
      }
    })
    $("a").on("click", function () { $(".ui-dialog").remove(); })
  }

})
