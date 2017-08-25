    //Return new  __()
return function (nodes, context) {
    var doc = (context) ? (context instanceof __)? context.nodes[0] : context : document;
      return new __(nodes,doc);
    }
   })();
   $ant = $ant.query;
})($ant || ($ant={}))