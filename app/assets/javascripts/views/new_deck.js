Csbs.Views.NewDeck = Backbone.View.extend ({
  template: JST['decks/_new_deck'],

  initialize: function (options) {
    this.model = options.model;
    this.newDeckId = options.newDeckId;
  },

  events: {
    "submit form.submit-new-deck": "saveNewDeck"
  },

  render: function (model) {
    if (typeof model === "undefined") {
      model = this.model
    }
    var content = this.template({ deck: model });
    this.$el.html(content);
    return this;
  },

  saveNewDeck: function (event) {
    event.preventDefault();
    var title = $(event.currentTarget).serializeJSON().deck.title;
    this.model.set({ title: title,
                     owner_id: this.newDeckId});
    this.model.save({}, {
      wait: true,
      success: function () {
        Backbone.history.navigate("#user_deck_show/"
                                  + this.newDeckId
                                  + "/nd",
                                  {trigger: true})
      }.bind(this),
      error: function (model) {
        this.render(model);
        this.$el.prepend("<h3 class='generic-error'>Error creating this deck; do not forget to give a title</h3>");
      }
    })
  }
})
