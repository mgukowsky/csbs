Csbs.Views.FlashcardEdit = Backbone.View.extend ({
  template: JST["flashcards/_flashcard_edit"],

  initialize: function (options) {
    this.collection = options.collection;
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function (card) {
      var content = this.template({card: card});
      this.$el.append(content);
    }.bind(this))
    return this;
  }
})
