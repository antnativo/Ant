function __(nodes, context) {
      this.nodes = [];
      this.document = context;
      this.history = []
      this.previousSelectors = [];
      if(nodes)
        this.find(nodes);
      this.length = this.nodes.length
      return this;
    }