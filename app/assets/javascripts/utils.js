(function(){
  if (typeof window.CsbsUtils === "undefined"){
    window.CsbsUtils = {};
  }

  CsbsUtils.flashMsg = function(msg){
    var $msg = $("<div class='flashMsg'>" + msg + "</div>");
    $("body").append($msg);
    //Make sure the DOM has loaded the element properly before triggering the transition,
    //then fade it away and delete it
    setTimeout(function(){
      $msg.css({"left": "0px"})
      setTimeout(function(){
        $msg.css({"opacity": "0"})
        setTimeout(function(){
          $msg.remove();
        }, 5000)
      }, 5000);
    }, 1000)
  }
})();
