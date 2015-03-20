Csbs.Views.NewDeck = Backbone.View.extend ({
  template: JST['decks/_new_deck'],

  initialize: function (options) {
    this.model = options.model;
    this.newDeckId = options.newDeckId;
  },

  events: {
    "submit form.submit-new-deck": "saveNewDeck",
    "submit form.submit-new-subject": "saveNewSubject",
    // "click button.random-deck-generate": "randomDeckGet"
  },

  render: function (model) {
    if (typeof model === "undefined") {
      model = this.model
    }
    var content = this.template({ deck: model });
    this.$el.html(content);
    this.getAndAttachSubjects(this.newDeckId);
    return this;
  },

  getAndAttachSubjects: function (userId, callback) {
    $.ajax({
      url: ("/users/" + userId + "/subjects"),
      method: "GET",
      dataType: "json",
      success: function(resp) {
        var $form = $("form.submit-new-deck");
        $form.append("<br><h3>Pick a subject for the deck:</h3>")
        var $select = $("<select name='deck[subject_id]'>")
        $select.addClass("subject-selection-list")
        $select.append("<option value='null' selected>None</option>");
        resp.forEach(function (r) {
          var $input = $("<option value='" + r.id  + "'>" + r.title + "</option>");

          $input.appendTo($select);
          $("div.deck-subject-creation-forms").accordion({
            heightStyle: "content"
          });

        });
        $form.append($select);
        if (callback) {
          callback();
        };
      }.bind(this)
    })
  },

  saveNewDeck: function (event) {
    event.preventDefault();
    var title = $(event.currentTarget).serializeJSON().deck.title;
    var subjectId = $(event.currentTarget).serializeJSON().deck.subject_id;
    console.log(subjectId);
    this.model.set({ title: title,
                     owner_id: this.newDeckId,
                     subject_id: subjectId});
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
      }.bind(this)
    })
  },

  saveNewSubject: function (event) {
    event.preventDefault();
    var title = $(event.currentTarget).serializeJSON().subject.title;
    $.ajax({
      url: ("/post_subject"),
      method: "POST",
      data: $(event.currentTarget).serializeJSON(),
      dataType: "json",
      success: function(resp, respcont) {
        this.render();
        var modalTitle = "Created a New Subject '" + resp.title + "' Successfully!";
        $("div.new-subject-confirmation").dialog({
          title: modalTitle,
          minWidth: 800,
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
      }.bind(this)
    })
  }

  // randomDeckGet: function (event) {
  //   var categoryId = Math.floor(Math.random() * 10000) + 1;
  //   $.ajax({
  //     url: ("http://jservice.io/api/category?id=" + categoryId),
  //     type: "GET",
  //     cross-domain: true,
  //     success: function (resp) {
  //       console.log(resp)
  //     }
  //   });
  // }
})
