    //Return new  __()
return function (nodes, context) {
    var doc = (context) ? context : document;
      return new __(nodes,doc);
    }
   })();
   $ant = $ant.query;
})($ant || ($ant={}))