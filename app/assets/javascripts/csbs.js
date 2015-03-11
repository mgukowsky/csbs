window.Csbs = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Csbs.Routers.AppRouter;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Csbs.initialize();
});
