Csbs.Views.DeckIndex = Backbone.View.extend ({
  template: JST["decks/_deck_index"],
  className: "deck-display-container",

  initialize: function (options) {
    this.collection = options.collection;
    this.msg = options.msg;
    this.listenTo(this.collection, "destroy", this.render)
  },

  events: {
    "click button.deck-delete-button": "deckDestroy",
    "click li.all-subjects-display": "reRender",
    "click li.single-subjects-display-selector": "renderSubject",
    "click li.no-subjects-display": "renderNoSubjects",

  },

  render: function (callback, options) {
    if (typeof options === "undefined") {
      options = {};
    }
    var content = this.template({ username: this.collection.username });
    this.$el.html(content);
    var $divdiv = $("div.user-deck-container");
    var $li = $("li.all-subjects-display");
    $li.addClass("clicked");
    this.collection.each(function (deck) {
      if (deck.get("is_current_user") || !deck.get("is_private")) {
        var view = new Csbs.Views.DeckShow({deck: deck});
        $divdiv.append(view.render().$el);
      }
    }.bind(this))
    var msg = this.renderMsg(this.msg);
    var $a = $("<a>");
    this.$el.prepend($(msg));
    $a.attr("href", "/").text("Back to home");
    this.$el.append("<br>");
    this.$el.append($a);
    this.getAndAttachSubjects(this.collection.userId, callback);
    return this;
  },

  reRender: function () {
    var $container = $("div.user-deck-container")
    this.render(function () {
      var $container = $("div.user-deck-container")
      var $li = $("li.all-subjects-display");
      $li.addClass("clicked");
    }.bind(this));
  },

  renderNoSubjects: function (event) {
    var content = this.template({ username: this.collection.username });
    this.$el.html(content);
    var $divdiv = $("div.user-deck-container");
    this.collection.each(function (deck) {
      if ((deck.get("is_current_user") || !deck.get("is_private"))
          && deck.get("subject_id") === null) {
        var view = new Csbs.Views.DeckShow({deck: deck});
        $divdiv.append(view.render().$el);
      }
    }.bind(this));
    var $a = $("<a>");
    $a.attr("href", "/").text("Back to home");
    this.$el.append("<br>");
    this.$el.append($a);
    this.getAndAttachSubjects(this.collection.userId, function () {
      var $li = $("li.no-subjects-display");
      $li.addClass("clicked");
    });
    return this;
  },

  renderSubject: function (event) {
    var subjectId = $(event.target).attr("data-id");
    var content = this.template({ username: this.collection.username });
    this.$el.html(content);
    var $divdiv = $("div.user-deck-container");
    this.collection.each(function (deck) {
      if ((deck.get("is_current_user") || !deck.get("is_private"))
          && deck.get("subject_id") == subjectId) {
        var view = new Csbs.Views.DeckShow({deck: deck});
        $divdiv.append(view.render().$el);
      }
    }.bind(this));
    var $a = $("<a>");
    $a.attr("href", "/").text("Back to home");
    this.$el.append("<br>");
    this.$el.append($a);
    this.getAndAttachSubjects(this.collection.userId, function () {
      var $li = $("li.single-subject-display" + ($(event.target).attr("data-id")));
      $li.addClass("clicked");
    });
    return this;
  },

  deckDestroy: function (event) {
    var currentId = $(event.target).attr("data-id");
    var model = this.collection.get(currentId);
    model.destroy({
      wait: true,
      success: function () {
        this.render();
        this.$el.prepend("<h3 class='generic-notice'>Deck deleted successfully!</h3>")
      }.bind(this)
    })
  },

  getAndAttachSubjects: function (userId, callback) {
    $.ajax({
      url: ("/users/" + userId + "/subjects"),
      method: "GET",
      dataType: "json",
      success: function(resp) {
        var $ul = $.find("ul.user-subjects");
        resp.forEach(function (r) {
          var $li = $("<li>");
          $li.html(r.title).addClass("single-subject-display" + r.id);
          $li.addClass("single-subjects-display-selector");
          $li.attr("data-id", r.id);
          $li.appendTo($ul);
        });
        $($ul).append("<br><br>")
        var $li = $("<li>");
        $li.html("All Decks").addClass("all-subjects-display");
        $li.appendTo($ul);
        var $li = $("<li>");
        $li.html("Decks with no subject").addClass("no-subjects-display");
        $li.appendTo($ul);
        if (callback) {
          callback();
        };
      }.bind(this)
    })
  },

  renderMsg: function (msg) {
    if (msg === "nd") {
      Backbone.history.navigate("#user_deck_show/" + this.collection.userId)
      return "<h3 class='generic-notice'>New deck successfully created</h3>"
    }
    else {
      return ""
    }
  }
})
