Csbs.Views.DeckEdit = Backbone.View.extend ({
  template: JST["decks/_deck_edit"],

  initialize: function (options) {
    this.deckId = options.deckId;
    this.collection = options.collection;
  },

  events: {
    "click button.flashcard-delete": "flashcardDelete",
    "click button.submit-deck-update": "updateDeck",
    "submit form.flashcard-edit-form": "createFlashcard",
    "submit form.flashcard-new-form": "createFlashcard",
    "submit form.deck-edit-header": "updateDeckStats"

  },

  render: function () {
    var deck = new Csbs.Models.Deck({id: this.deckId});
    deck.fetch({
      success: function () {
        var content = this.template({deck: deck});
        this.$el.html(content);
        this.getAndAttachSubjects(this.collection.userId)
        var subView = new Csbs.Views.FlashcardEdit({collection: this.collection});
        this.$el
          // .find("div.flashcards-container")
          .append(subView.render().$el);
      }.bind(this)
    });
    return this;
  },

  getAndAttachSubjects: function(userId) {
    $.ajax({
      url: ("/users/" + userId + "/subjects"),
      method: "GET",
      dataType: "json",
      success: function(resp) {
        var $select = $("<select class='topic-options' name='deck[subject_id]'>");
        // $select.append("<br><h3>Pick a topic for the deck:</h3><br>")
        // $select = $("<select name='deck[subject_id]'>")
        // $select.addClass("subject-selection-list")
        $select.append("<option value='null' selected>None</option>");
        resp.forEach(function (r) {
          var $input = $("<option value='" + r.id  + "'>" + r.title + "</option>");

          $input.appendTo($select);
        });
        $select.appendTo($("form.deck-edit-header"));
        // $form.append($select);

      }
    })
  },

  flashcardDelete: function (event) {
    event.preventDefault();
    var model = this.collection.get($(event.target).attr("data-id"));
    model.destroy({
      wait: true,
      success: function () {
        this.render();
      }.bind(this)
    })
  },


  createFlashcard: function (event) {
    event.preventDefault();

    var currentData = $(event.currentTarget).serializeJSON();
    if (currentData.flashcard.question === "" ||
        currentData.flashcard.answer === "") {
          console.log("error");
          return null;
    };

    if ($(event.target).attr("data-id")) {
      var model = this.collection.get($(event.target).attr("data-id"));
      model.set({ deck_id: this.deckId,
                  question: currentData.flashcard.question,
                  answer: currentData.flashcard.answer});
      model.save({}, {
        wait: true,
        success: function () {},
        error: function () {console.log("error")}
      });
      // this.collection.set(model);
    }
    else {
      this.collection.create({ deck_id: this.deckId,
                               question: currentData.flashcard.question,
                               answer: currentData.flashcard.answer },
          { wait: true,
            success: function () {this.render()}.bind(this),
            error: function () {console.log("error")}

          })

    }
  },

  updateDeck: function (event) {
    event.preventDefault();
    this.$el.find("form.flashcard-edit-form").trigger("submit");
    this.$el.find("form.flashcard-new-form").trigger("submit");
    this.$el.find("form.deck-edit-header").trigger("submit");
  },

  updateDeckStats: function (event) {
    event.preventDefault();
    var currentData = $(event.currentTarget).serializeJSON();
    var model = new Csbs.Models.Deck({id: this.deckId})
    model.save(currentData, {patch: true});
  }
})
