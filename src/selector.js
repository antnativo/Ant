// Private //
    function writeHistory() {
      this.history.push(this.nodes.slice())
    }
    function setCurrentNode(self, value, noHistory) {
      self.nodes = value;
      self.length = 0 
      Array.prototype.splice.apply(self, [0, value.length].concat(value));
      (self.history.length == 0 || !noHistory || noHistory != "undefined") ? self.history.push(value.slice()) : null;
    }
    function converToArray(value) {
      return Array
        .prototype
        .slice
        .apply(value);
    }
    function convertToArrayAndSetNode(self, nodes) {
      switch (!(nodes instanceof Array)) {
        case true:
          setCurrentNode(self, converToArray(nodes));
          break;
        default:
          setCurrentNode(self, nodes);
          break;
      }
    }
    function queryCSS(self, str) {
      var len = self.history.length,
        previousSelectors = self.previousSelectors.length ? self.previousSelectors[self.previousSelectors.length - 1] : "";
      self.document = self.document || window.document;
      if (this.nodes && this.nodes.length == 1) {
        if (len > 0 && this.nodes == self.history[0]) {
          internalDoc = this.nodes[0];
        } else if (len > 0 && this.nodes != self.history[0]) {
          internalDoc = self.history[0];
        }
      } else if (this.nodes && this.nodes.length > 1) {
        str = previousSelectors + " " + str;
        internalDoc = self.document
      } else
        internalDoc = self.document
      if (!((internalDoc instanceof HTMLDocument || (internalDoc.constructor && internalDoc.constructor.name == "HTMLDocument")) && internalDoc.nodeType == 9))
        if ((internalDoc instanceof HTMLBodyElement || internalDoc.constructor.name == "HTMLBodyElement")|| internalDoc instanceof HTMLElement || internalDoc instanceof HTMLCollection || internalDoc instanceof NodeList ) 
          internalDoc = internalDoc.ownerDocument
        else
          throw new Error("Parent Node must be and HTMLElement");
      var foundNodes = internalDoc.querySelectorAll(str)
      if (foundNodes.length > 1)
        str = previousSelectors + " " + str;
      str = str.trim()
      self.previousSelectors.push(str)
      convertToArrayAndSetNode(self, internalDoc.querySelectorAll(str));
    }
 // PUBLIC //
    __.prototype.find = function (nodes) {
      if (typeof nodes == "undefined") return this;
      console.log(typeof (nodes))
      if (/(<)(\w+)((\s+)([\w="'\S])*)*(>)[\w\s\d\!@#$%^&*()_\-+={}\[\]|\\:;"',.?\/~`Œ„´‰ˇÁ¨ˆØ∏ÅÍÎ˝ÓÔÒÚ¸˛˜Â]*((<)(\/)\2{0,1}(>))/gi.test(nodes)) {
        //if (/(<)(\w+)((\s+)([\w="'])*)*(>)[\w\s\d\!@#$%^&*()_\-+={}\[\]|\\:;"',.?\/~`Œ„´‰ˇÁ¨ˆØ∏ÅÍÎ˝ÓÔÒÚ¸˛˜Â]*((<)(\/)\2{0,1}(>))/gi.test(nodes)) {        var tmpNode = document.createElement("div")
        tmpNode.innerHTML = nodes;
        nodes = tmpNode.childNodes
        tmpNode = null;
      }
      switch (typeof nodes) {
        case "string":
          queryCSS(this, nodes.trim());
          break
        case "object":
        default:
        if(nodes.constructor && nodes.constructor.name)  
          switch (nodes.constructor.name) {
            case "Window":
              this.document = nodes.document
              setCurrentNode(this, [nodes])
              break
            case "HTMLDocument":
              this.document = nodes
              setCurrentNode(this, [nodes])
              break
            case "K":
            case "jQuery":
            case "nQurey":
            case "$":
            case "zepto":
              this.document = nodes.context
              setCurrentNode(this, nodes)
              break
            case "Array":
              setCurrentNode(this, nodes)
              break
            case "__":
              setCurrentNode(this, Array.prototype.slice.apply(nodes.nodes))
              break
            default:
            if (nodes instanceof HTMLCollection || nodes instanceof NodeList) 
              convertToArrayAndSetNode(this, nodes)
            else if (nodes instanceof HTMLElement) 
              setCurrentNode(this, [nodes])
            else  
              throw new Error("Unable to find node")
              break
          } else
            throw new Error("Unable to find node")
          break
      }
      writeHistory.call(this);
      return this;
    };
    __.prototype.noConflict = function () { }