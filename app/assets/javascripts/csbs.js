window.Csbs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  eventAggregator: _.extend({}, Backbone.Events),
  initialize: function() {
    new Csbs.Routers.AppRouter;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Csbs.initialize();
});
