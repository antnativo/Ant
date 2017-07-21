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
        } else {
          this.nodes.addEventListener("click", func, false);
        }
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