// Private //
function writeHistory() {
      this.history.push(this.nodes.slice())
    }
    function setCurrentNode(self, value, noHistory) {
      self.nodes = value;
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
      var len = self.history.length;
      if(this.nodes && this.nodes.length == 1){
        if (len > 0 && this.nodes == self.history[0]) {
          internalDoc = this.nodes[0];
        } else if (len > 0 && this.nodes != self.history[0]) {
          internalDoc = self.history[0];
        }
      } else if (this.nodes && this.nodes.length > 1 ){ 

      } else {
        internalDoc = self.document
      }
      if (internalDoc instanceof Array)
        throw new Error("Parent Node must be and HTMLElement");
      convertToArrayAndSetNode(self, internalDoc.querySelectorAll(str));
}
 // PUBLIC //
    __.prototype.find = function (nodes) {
      if (nodes instanceof Array) {
        setCurrentNode(this, nodes);
      } else if (nodes instanceof HTMLCollection) {
        convertToArrayAndSetNode(this, nodes);
      } else if (typeof nodes == "string") {
        queryCSS(this, nodes.trim());
      } else if (nodes instanceof HTMLElement) {
        setCurrentNode(this, [nodes]);
      } else {
        throw new Error("Unable to find node")
      }
      return this;
      //(<)(\w+)(\s+)([\w="'])*(>)[\w\s\d\!@#$%^&*()_\-+={}\[\]|\\:;"',.?\/~`Œ„´‰ˇÁ¨ˆØ∏ÅÍÎ˝ÓÔÒÚ¸˛˜Â]*((<)(\/)\2{0,1}(>)) 
    };