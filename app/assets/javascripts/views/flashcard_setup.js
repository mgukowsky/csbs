Csbs.Views.FlashcardSetup = Backbone.View.extend({
  template: JST["flashcards/_flashcard_setup"],

  initialize: function (options) {
    this.iterator = options.iterator;
    this.card = options.card;
    this.collection = options.collection;
  },

  render: function () {
    var content = this.template({iterator: this.iterator, card: this.card, collection: this.collection});
    this.$el.html(content);
    return this;
  },
})
