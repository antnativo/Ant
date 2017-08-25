    __.prototype.each = function (func) {
      var count = this.nodes.length - 1
      while (count >= 0) {
        var that = this.nodes[count];
        func(this.nodes[count], count, this.nodes)
        count--;
      }
      return this;
    };
    __.prototype.andSelf = function () {
      setCurrentNode(this,this.history.pop())
      return this;
    };
    __.prototype.currentNodes = function () {
      return { "self": this, "nodes": this.nodes };
    };
    __.prototype.first = function () {
      writeHistory.call(this)
      this.nodes.length = 1;
      return this;
    }
    __.prototype.addBack = function () { 
      var prevNodes = this.history[this.history.length - 2]
      setCurrentNode(this, this.nodes.concat(prevNodes))
      return this;
    }
    __.prototype.inArray = function (value, array) { 
      if (array instanceof Array)
        return array.indexOf(value)
      else
        return this;  
    }
    __.prototype.size = function () { 
      return length;
    }
    __.prototype.filter = function (search,match) { 
      switch (search.constructor.name) { 
        case "String":
          return this.find(search)  
          break;
        case "Array":
          return this; // Incomplete --AC
          break;  
      }
    }