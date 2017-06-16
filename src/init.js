function __(nodes,context) {
      this.nodes;
      this.document = context;
      this.history = [];
      this.find(nodes);
      this.length = this.nodes.length;
      return this;
    }