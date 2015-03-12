Csbs.Views.FlashcardEdit = Backbone.View.extend ({
  template: JST["flashcards/_flashcard_edit"],

  initialize: function (options) {
    this.collection = options.collection;
    this.hasUncommittedFlashcards = true; //will default to false
  },

  events: {
    "click button.submit-deck-update": "submissionCheckpoint"
  },

  renderStage1: function () {
    this.$el.empty();
    this.$el.append("<br><button class='submit-deck-update'>Submit</button>");

  }

  renderStage2: function () {
    this.$el.empty();
    this.collection.each(function (card) {
      var content = this.template({card: card});
      this.$el.append(content);
    }.bind(this));
    this.$el.append("<br><button class='submit-deck-update'>Submit</button>");
    return this;
  },

  submissionCheckpoint: function (event) {
    event.preventDefault();

    if (this.hasUncommittedFlashcards) {
      alert("Please save your edited flashcards first")
    }
  }
})
