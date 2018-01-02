    //PRIVATE -EVENTS
    function handleReadyEvent(item,func) { 
      switch (item instanceof HTMLDocument || item instanceof Window) {
        case true:
          var status = item.readyState || item.document.readyState;
          if (status != "complete")
            (item instanceof HTMLDocument) ? item.addEventListener("load", func, false) : item.document.addEventListener("load", func, false);
          else
            func();
          break;
        default:
          func()
          break;
      }
    }    
    //Events
    __.prototype.bind = function (event, func) {
      if (this.nodes instanceof Array) {
        this.each(function (item, index, array) {
          item.addEventListener(event, func, false);
        });
      } else {
        this.nodes.addEventListener(event, func, false);
      }
      return this;
    };
    __.prototype.on = __.prototype.bind;
    __.prototype.unbind = function (event, func) {
      if (this.nodes instanceof Array && typeof func == "function") {
        this.each(function (item, index, array) {
          (func) ? item.removeEventListener(event, func, false) : item["on" + event] = null;
        })
      } else {
        (func) ? this.nodes.removeEventListener(event, func, false) : this.nodes["on" + event] = null;
      }
      return this;
    };
    __.prototype.click = function (func) {
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            item.addEventListener("click", func, false);
          })
        } else if(this.nodes instanceof __) {
          this.nodes.on("click", func);
        } else if (this.nodes instanceof HTMLElement)
          this.nodes.addEventListener("click", func, false);          
      } else {
        this.nodes.click();
      }
      return this;
    };
    __.prototype.ready = function (func) { 
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            handleReadyEvent(item,func)
          })
        } else { 
          handleReadyEvent(this.nodes,func)
        }
      }
      return this;
    }
    __.prototype.mouseenter = function (func) {
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            item.addEventListener("mouseenter", func, false);
          })
        } else if(this.nodes instanceof __) {
          this.nodes.on("mouseenter", func);
        } else if (this.nodes instanceof HTMLElement)
          this.nodes.addEventListener("mouseenter", func, false);          
      } else {
        this.nodes.mouseenter();
      }
      return this;
    };
    __.prototype.mouseleave = function (func) {
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            item.addEventListener("mouseleave", func, false);
          })
        } else if(this.nodes instanceof __) {
          this.nodes.on("mouseleave", func);
        } else if (this.nodes instanceof HTMLElement)
          this.nodes.addEventListener("mouseleave", func, false);          
      } else {
        this.nodes.mouseleave();
      }
      return this;
    };
    __.prototype.mouseover = function (func) {
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            item.addEventListener("mouseover", func, false);
          })
        } else if(this.nodes instanceof __) {
          this.nodes.on("mouseover", func);
        } else if (this.nodes instanceof HTMLElement)
          this.nodes.addEventListener("mouseover", func, false);          
      } else {
        this.nodes.mouseover();
      }
      return this;
    };
    __.prototype.mouseout = function (func) {
      if (typeof func == "function") {
        if (this.nodes instanceof Array) {
          this.each(function (item, index, array) {
            item.addEventListener("mouseout", func, false);
          })
        } else if(this.nodes instanceof __) {
          this.nodes.on("mouseout", func);
        } else if (this.nodes instanceof HTMLElement)
          this.nodes.addEventListener("mouseout", func, false);          
      } else {
        this.nodes.mouseout();
      }
      return this;
    };