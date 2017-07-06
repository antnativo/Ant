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
      this.nodes = this.history.pop();
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
      this.previousSelectors[this.previousSelectors - 2]
    }