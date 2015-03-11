Csbs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = $("div.backbone-container");
    this.$originalView = $("div.backbone-container");
  },

  routes: {
    "": "dummy",
    "show_deck_cards/:id": "renderFlashcards"
  },

  dummy: function () {
  },

  renderFlashcards: function (id) {
    var c = new Csbs.Collections.Flashcards;
    c.fetch({
      data: $.param({ deck_id: id}),
      success: function (model, resp) {
        // var view = new Csbs.Views.FlashcardShow({collection: c,
        //                                          $originalView: this.$originalView});
        // this._swapView(view);
        this.iterateThroughCards(c)
      }.bind(this)
    });
  },

  iterateThroughCards: function(flashcards) {
    // flashcards.each(function (card) {
      var view = new Csbs.Views.FlashcardShow({collection: flashcards});
      this._swapView(view);
    // }.bind(this))
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(view.render().$el);
  }
})
