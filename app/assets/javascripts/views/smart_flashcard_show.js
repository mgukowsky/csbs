Csbs.Views.SmartFlashcardShow = Backbone.View.extend ({
  template: JST['flashcards/_flashcard_show'],
  initialize: function (options) {
    this.collection = options.collection;
    this.questionHash = this.setupQuestionHash(this.collection);
  },

  events: {
    "click a.back-button": "goBack",
    "click button.fire-study-start": "beginStudying",
    "click button.next-question": "setupNextCard",
    "click button.reveal-answer": "revealAnswer",
    "click button.previous-question": "setupPreviousCard",
  },

  //TODO: Use a hash to retrieve and update a card adaptively in O(1) time
  //TODO: Initially calculate the average mastery for the total mastery,
  //then recalculate it in O(1) time by subtracting the previous mastery score,
  //adding the new one, then dividing.
  setupQuestionHash: function(collection) {
    var qHash = { none: [],
                  1: {},
                  2: {},
                  3: {},
                  4: {},
                  5: {},
                  //Used to avoid O(n) growth later on
                  keyValLengths: {1:0, 2:0, 3:0, 4:0, 5:0}
                }
    collection.each(function(q){
      var mastery = q.get('mastery');
      if (mastery) {
        qHash[mastery][q.id] = q;
        qHash.keyValLengths[mastery] += 1
      } else {
        qHash.none.push(q);
      }
    })
    return qHash;
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
    this.iterator += 1;
    this.renderNextCard(this.iterator)
  },

  setupPreviousCard: function () {
    this.iterator -= 1;
    this.renderNextCard(this.iterator)
  },

  revealAnswer: function () {
    this.$el.find(".next-question").html("Next question  <garbageTag style='font-size: 30px'>></garbageTag>");
    this.$el.find(".flashcard-answer")
    .css({"opacity": "1"})
    .dialog({
      title: "Answer",
      minWidth: 400,
      maxWidth: 800,
      maxHeight: 400,
      modal: true,
      show: {
        effect: "puff",
        duration: 500
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
    if (this.questionHash.none.length > 0) {
      var currentCard = this.questionHash.none.shift();
      var view = new Csbs.Views.FlashcardSetup({iterator: 0,
                                                card: currentCard,
                                                collection: this.collection});
      this.$el.find("div.flashcard-container").html(view.render().$el);
    } else {
      var currentCard = this.getCardAdaptively();
      var view = new Csbs.Views.FlashcardSetup({iterator: this.iterator,
        card: currentCard,
        collection: this.collection})
      this.$el.find("div.flashcard-container").html(view.render().$el);
    }
  },

  getCardAdaptively: function(){
    var selection = Math.floor(Math.random() * 100);
    selection = this.coerceToBucketRange(selection);
    var maxIters = 0;
    //Make sure we are not going to key into an empty object
    while (this.questionHash.keyValLengths[selection] <= 0) {
      if (selection < 5) {selection += 1;}
      else {selection = 1;}
      maxIters += 1;
      //Prevent infinite loop, just to be safe
      if (maxIters > 10) {return null;}
    }
    //Get a random index in the object
    var tempIters = (Math.floor(Math.random() * 1000)) % this.questionHash.keyValLengths[selection]
    var numIters = 0;
    var tempKey;
    for (var k in this.questionHash[selection]){
      if (numIters === tempIters) {tempKey = k; break;}
      numIters += 1;
    }
    var tempCard = this.questionHash[selection][tempKey];
    return tempCard;
  },

  coerceToBucketRange: function(num){
    //5% chance of getting a 5 rated card (range 0..4)
    if (num < 5) {return 5;}
    //10% chance of getting a 4 rated card (range 5..14)
    else if (num < 15) {return 4;}
    //20% chance of getting a 3 rated card (range 15..34)
    else if (num < 35) {return 3;}
    //28% chance of getting a 2 rated card (range 35..62)
    else if (num < 63) {return 2;}
    //37% chance of getting a 1 rated card (range 63..99)
    else {return 1;}
  },

  submitMastery: function (event) {
    event.preventDefault();
    var cardId = $(event.currentTarget).attr("data-id");
    var model = this.collection.get(cardId);
    var oldMastery = model.get("mastery");
    model.save($(event.currentTarget).serializeJSON(), {
      wait: true,
      success: function () {
        $(".ui-dialog").remove();
        CsbsUtils.flashMsg("Your feedback has been saved!");
        //Remove the card from the hash and decrement the length of the corresponding key value
        delete this.questionHash[oldMastery][cardId];
        this.questionHash.keyValLengths[oldMastery] -= 1;

        this.questionHash[model.get("mastery")][model.id] = model;
        this.questionHash.keyValLengths[model.get("mastery")] += 1;
      }.bind(this)
    });
  }
})
