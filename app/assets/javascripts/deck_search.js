(function () {
  if (typeof window.NameSearch === "undefined") {
    window.NameSearch = {}
  }

  NameSearch.cacheUsersAndSetupSearch = function () {
    $.ajax({
      url: "/users",
      type: "GET",
      success: function (usersData) {
        NameSearch.cachedUsers = usersData;
        //Only allow search bar to appear after caching AJAX response
        $("div.deck-search-bar-container")
          .html("<input type='text' class='deck-search-bar'><br>");
        $searchEl = $("div.deck-search-div");
        $input = $searchEl.find("input.deck-search-bar");
        $results = $searchEl.find("ul.deck-search-results");

        $(document.body).on("input",".deck-search-bar", function () {
          NameSearch.deckSearch();
        });
      }.bind(this)
    })
  };

  NameSearch.deckSearch = function () {
    if ($input.val() === "") {
      $results.empty();
      return null;
    }

    searchQuery = $input.val().toLowerCase();
    searchResults = [];

    NameSearch.cachedUsers.forEach(function(data){
      if (data.username.toLowerCase().match(searchQuery)) {
        searchResults.push(data)
      }
    })
    this.renderResults(searchResults);
  };

  NameSearch.renderResults = function (searchResults) {
    //Limit data to avoid unmanageable huge num of results; avoid display mess
    if (searchResults.length > 50) {
      searchResults = searchResults.slice(0, 50);
    }

    $results.empty();
    searchResults.forEach(function (result) {
      $a = $("<a>");
      $a.attr("href", "/users/" + result.id + "/decks");
      $a.html("<button>" + result.username + "</button><br>");
      $results.append($a)
    }.bind(this));
  };
})();
