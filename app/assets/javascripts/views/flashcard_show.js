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
    "click button.next-question": "setupNextCard",
    "click button.reveal-answer": "revealAnswer",
    "click button.previous-question": "setupPreviousCard",
  },

  render: function () {
    var content = this.template({backId: this.collection.authorId})
    this.$el.html(content);
    return this;
  },

  goBack: function (event) {
    event.preventDefault();
    $jQueryDiags = $(".ui-dialog");
    if (typeof $jQueryDiags[0] !== "undefined") {
      $($jQueryDiags[0]).effect("shake", "slow");
      return null;
    }
    window.history.back();
  },

  beginStudying: function () {
    this.$el.find("button.fire-study-start").css({"display":"none"});
    this.renderNextCard(this.iterator);
  },

  setupNextCard: function () {
    $("h3.generic-notice").remove();
    this.iterator += 1;
    this.renderNextCard(this.iterator)
  },

  setupPreviousCard: function () {
    $("h3.generic-notice").remove();
    this.iterator -= 1;
    this.renderNextCard(this.iterator)
  },

  revealAnswer: function () {
    this.$el.find(".next-question").html("Next question  <garbageTag style='font-size: 30px'>></garbageTag>");
    this.$el.find(".flashcard-answer")
      // .removeClass("invisible")
      .css({"opacity": "1"})
      .dialog({
        title: "Answer",
        minWidth: 400,
        maxWidth: 800,
        maxHeight: 400,
        modal: true,
        show: {
          effect: "puff",
          duration: 1000
        },
        close: function () {
          $("div.ui-dialog").remove()
        }.bind(this),
        hide: {
          effect: "explode",
          duration: 500
        }
      })
    $("form.flashcard-rating-form").on("submit", this.submitMastery.bind(this))
  },


  renderNextCard: function (iterator) {
    if (iterator === this.endQuestion) {
      this
        .$el
        .find("div.flashcard-container")
        .html("<h1>All Done :)</h1>")
        .append("<button class='previous-question'>Previous question</button>");
    }
    else {
      var currentCard = this.collection.models[iterator];
      var view = new Csbs.Views.FlashcardSetup({iterator: this.iterator,
                                                card: currentCard,
                                                collection: this.collection})
      this.$el.find("div.flashcard-container").html(view.render().$el)
      if (iterator > 0) {
        this.$el.find("button.previous-question").removeClass("invisible")
      }
      else {
        this.$el.find("button.previous-question").addClass("invisible")
      }
    }
  },

  submitMastery: function (event) {
    event.preventDefault();
    var cardId = $(event.currentTarget).attr("data-id");
    var model = this.collection.get(cardId);
    model.save($(event.currentTarget).serializeJSON(), {
      wait: true,
      success: function () {
        $(".ui-dialog").remove();
        $(".backbone-container").prepend("<h3 class='generic-notice'>Your feedback has been saved</h3>")
        // $("h3.generic-notice").effect("shake", {times: 10});
      }
    });
  }
})
