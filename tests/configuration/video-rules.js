(function (window) { 
  var videoRules = [];
  function NativoVideoTracking() { 
  }
  function AOLVideoTracking() { 
  }
  function YouTubeVideoTracking() { 
  }
  function checkVideoTracking(info, player, assert) {
    // Add Tracking Verification logic here
    switch (Object.getPrototypeOf(player).constructor.name) { 
      case "NatvioVideo":
          NativoVideoTracking()
        break;
      case "YouTubeVideo":
          YouTubeVideoTracking()
        break;
      case "AOLVideo":
          AOLVideoTracking()  
        break;
    }
  };
  window.checkActionType = function(e,assert,done) { 
      var actionType;
        if (!e.data[e.data.length - 1].additionalInfo)
          actionType = e.data[0].match(/(ntv_at=)([0-9,]+)/gi)[0].split("=")[1]
        else {
          var info = e.data[e.data.length - 1].additionalInfo,
            player = e.data[e.data.length - 2]  ;
          window.checkVideoTracking(info, player, assert)
          if (info.actionType == "23")
            done()  
        }
    }
})(window)
