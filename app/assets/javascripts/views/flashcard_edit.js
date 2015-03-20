Csbs.Views.FlashcardEdit = Backbone.View.extend ({
  template: JST["flashcards/_flashcard_edit"],

  initialize: function (options) {
    this.collection = options.collection;
    this.hasUncommittedFlashcards = false;
  },

  events: {
    "click button.submit-deck-update": "submissionCheckpoint",

  },

  render: function () {
    var iterator = 1;
    this.collection.each(function (card) {
      var content = this.template({ card: card,
                                    iterator: iterator });
      this.$el.append(content);
      iterator += 1
    }.bind(this));
    var newCardSubview = this.template({ card: new Csbs.Models.Flashcard,
                                        iterator: iterator });
    this.$el.append(newCardSubview);
    this.$el.append("<br><button class='submit-deck-update'>Save all cards and update this deck</button><br><br>");
    var $a = $("<a>");
    $a.attr("href", "#user_deck_show/" + this.collection.authorId).text("Back to decks");
    this.$el.append($a);

    return this;
  },


  submissionCheckpoint: function (event) {
    event.preventDefault();

    if (this.hasUncommittedFlashcards) {
      alert("Please save your edited flashcards first")
    }
  }
})
