(function () {
  if (typeof window.NameSearch === "undefined") {
    window.NameSearch = {}
  }



  NameSearch.cacheUsersAndSetupSearch = function () {

    $("div.deck-search-bar-container")
          .html("<input type='text' class='deck-search-bar'><br>");
    NameSearch.$searchEl = $("div.deck-search-div");
    NameSearch.$input = NameSearch.$searchEl.find("input.deck-search-bar");
    NameSearch.$results = NameSearch.$searchEl.find("ul.deck-search-results");
    $(document.body).on("input",".deck-search-bar", function () {
      NameSearch.deckSearch();
    });
  };


  NameSearch.deckSearch = function () {
    if (NameSearch.$input.val() === "") {
      NameSearch.$results.empty();
      return null;
    }

    searchQuery = NameSearch.$input.val().toLowerCase();
    searchResults = [];

    $.ajax({
      url: "/users",
      type: "GET",
      data: {name_query: NameSearch.$input.val()},
      success: function (usersData) {
        usersData.forEach(function(data){
          if (data.username.toLowerCase().match(searchQuery)) {
            searchResults.push(data)
          }
        })
        this.renderResults(searchResults);
      }.bind(this)
    });
  };

  NameSearch.renderResults = function (searchResults) {
    //Limit data to avoid unmanageable huge num of results; avoid display mess
    if (searchResults.length > 50) {
      searchResults = searchResults.slice(0, 50);
    }

    NameSearch.$results.empty();
    if (searchResults.length === 0) {
      NameSearch.$results.html("No matching users");
      return null;
    }

    searchResults.forEach(function (result) {
      $a = $("<a>");
      $a.attr("href", "#user_deck_show/" + result.id);
      $a.html("<button>" + result.username + "</button><br>");
      NameSearch.$results.append($a)
    }.bind(this));
  };
})();
