Csbs.Views.DeckIndex = Backbone.View.extend ({
  template: JST["decks/_deck_index"],

  initialize: function (options) {
    this.collection = options.collection;
    this.msg = options.msg;
    this.listenTo(this.collection, "destroy", this.render)
  },

  events: {
    "click button.deck-delete-button": "deckDestroy"
  },

  render: function () {
    var content = this.template({ username: this.collection.username });
    this.$el.html(content);
    this.collection.each(function (deck) {
      var view = new Csbs.Views.DeckShow({deck: deck});
      this.$el.append(view.render().$el);
    }.bind(this))
    var msg = this.renderMsg(this.msg);
    var $a = $("<a>");
    this.$el.prepend($(msg));
    $a.attr("href", "/").text("Back to home");
    this.$el.append("<br>");
    this.$el.append($a);
    return this;
  },

  deckDestroy: function (event) {
    var currentId = $(event.target).attr("data-id");
    var model = this.collection.get(currentId);
    model.destroy({
      wait: true,
      success: function () {
        this.render();
        this.$el.prepend("<h3 class='generic-notice'>Deck deleted successfully!</h3>")
      }.bind(this)
    })
  },

  renderMsg: function (msg) {
    if (msg === "nd") {
      Backbone.history.navigate("#user_deck_show/19")
      return "<h3 class='generic-notice'>New deck successfully created</h3>"
    }
    else {
      return ""
    }
  }
})
