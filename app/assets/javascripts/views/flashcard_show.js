Csbs.Views.FlashcardShow = Backbone.View.extend ({
  template: JST['flashcards/_flashcard_show'],
  initialize: function (options) {
    this.collection = options.collection;
    this.endQuestion = this.collection.length;
    this.iterator = 0;
  },

  events: {
    "click a.back-button": "goBack",
    "click button.fire-study-start": "beginStudying",
    // "click button.next-question.unanswered": "skipQuestion",
    "click button.next-question": "setupNextCard",
    "click button.reveal-answer": "revealAnswer",
    "click button.previous-question": "setupPreviousCard"
  },

  render: function () {
    var content = this.template({backId: this.collection.authorId})
    this.$el.html(content);
    return this;
  },

  goBack: function (event) {
    event.preventDefault();
    window.history.back();
  },

  beginStudying: function () {
    this.$el.find("button.fire-study-start").css({"display":"none"});
    this.renderNextCard(this.iterator);
  },

  setupNextCard: function () {
    this.iterator += 1;
    this.renderNextCard(this.iterator)
  },

  setupPreviousCard: function () {
    this.iterator -= 1;
    this.renderNextCard(this.iterator)
  },

  revealAnswer: function () {
    this.$el.find(".next-question").text("Next question");
    this.$el.find(".flashcard-answer")
      .removeClass("invisible")
      .css({"opacity": "1"});
  },

  renderNextCard: function (iterator) {
    if (iterator === this.endQuestion) {
      this.$el.find("div.flashcard-container").html("<h1>All Done :)");
    }
    else {
      var currentCard = this.collection.models[iterator];
      var view = new Csbs.Views.FlashcardSetup({iterator: this.iterator,
                                                card: currentCard})
      this.$el.find("div.flashcard-container").html(view.render().$el)
      if (iterator > 0) {
        this.$el.find("button.previous-question").removeClass("invisible")
      }
      else {
        this.$el.find("button.previous-question").addClass("invisible")
      }
    }
  }
})
