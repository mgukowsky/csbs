Csbs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = $("div.backbone-container");
  },

  routes: {
    "": "dummy",
    "show_deck_cards/:id": "renderFlashcards",
    "edit_flashcards/:id": "editFlashcards",
    "user_deck_show/:id": "userDeckShow",
    "user_deck_show/:id/:msg": "userDeckShow",
    "new_user_deck/:id": "newUserDeck"
  },

  dummy: function () {
  },

  userDeckShow: function (id, msg) {
    var c = new Csbs.Collections.Decks;
    c.fetch({
      data: $.param({ user_id: id}),
      success: function (model, resp) {
        var view = new Csbs.Views.DeckIndex({collection: c,
                                             msg: msg});
        this._swapView(view);
      }.bind(this)
    })
  },

  newUserDeck: function (id) {
    var model = new Csbs.Models.Deck;
    var view = new Csbs.Views.NewDeck({ model: model,
                                        newDeckId: id });

    this._swapView(view);
  },

  renderFlashcards: function (id) {
    var c = new Csbs.Collections.Flashcards;
    c.fetch({
      data: $.param({ deck_id: id}),
      success: function (model, resp) {
        var view = new Csbs.Views.FlashcardShow({collection: c});
        this._swapView(view);
      }.bind(this)
    });
  },

  editFlashcards: function (id) {
    var c = new Csbs.Collections.Flashcards;
    c.fetch({
      data: $.param({ deck_id: id}),
      success: function (model, resp) {
        if (c.isCurrentUser) {
          var view = new Csbs.Views.FlashcardEdit({collection: c});
          this._swapView(view);
        }
        //Backbone "auth"
        else {
          this.$el.html("NICE TRY HACKER :)")
        }
      }.bind(this)
    })
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$el.html(view.render().$el);
  }
})
