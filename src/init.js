function __(nodes, context) {
      Array.call(this)
      this.nodes = [];
      this.document = context;
      this.history = [];
      this.previousSelectors = [];
      if(nodes)
        this.find(nodes);
      this.length = this.nodes.length;
      return Object.create(this);
}
__.prototype = Object.create(Array.prototype);
__.prototype.constructor = __;