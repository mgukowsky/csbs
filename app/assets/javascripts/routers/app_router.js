Csbs.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = $("div.backbone-container");
  },

  routes: {
    "": "test",
    "show_deck_cards/:id": "renderFlashcards"
  },

  test: function () {
  },

  renderFlashcards: function (id) {
    var c = new Csbs.Collections.Flashcards;
    c.fetch({
      data: $.param({ deck_id: id}),
      success: function (model, resp) {
        var $deckToAppendTo = $("[data-id=" + id + "]");
        resp.forEach( function (respElem) {
          console.log(respElem.question)
          $deckToAppendTo.append(respElem.question)
        })
      }
    });
  }
})
