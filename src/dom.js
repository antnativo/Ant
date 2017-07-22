    //DOM Manipulation
  __.prototype.contents = function () {
      writeHistory.call(this)
      var that = this,
        nodes = this.nodes.slice()
      this.nodes.length = 0;
      nodes.forEach(function (value, index, array) {
        console.log(value.contentWindow.document)
        if ((value instanceof HTMLIFrameElement))
          that.nodes.push(value.contentWindow.document);
      })
      return this;
    }
    __.prototype.html = function (value) {
      if (typeof value == "string" && value.length > 0) {
        switch (this.nodes instanceof Array) {
          case true:
            var that = this;
            this.each(function (item, index, array) {
              insertHTMLAndJS(that, value, item, true)
            })
            break;
          default:
            insertHTMLAndJS(this, value, this.nodes, true)
            break;
        }
      } else if (typeof value == "string" == 0) {
        switch (this.nodes instanceof Array) {
          case true:
            var that = this;
            this.each(function (item, index, array) {
              insertHTMLAndJS(that, value, item)
            })
            break;
          default:
            insertHTMLAndJS(this, value, this.nodes)
            break;
        }
      } else {
        return (this.nodes instanceof Array) ? null : this.nodes.innerHTML;
      }
    }
    __.prototype.append = function (node) {
      if (typeof node == "string") {
        //this.nodes.insertAdjacentHTML("beforeend", node);
        var div = document.createElement("div")
        div.innerHTML = node;
        if (!(this.nodes instanceof Array))
          this.nodes = [this.nodes]
        for (z = 0, zLen = this.nodes.length; z < zLen; z++)
          for (var i = 0, iLen = div.childNodes.length; i < iLen; i++) {
            if (div.childNodes[i].tagName && div.childNodes[i].tagName.toLowerCase() == "script") compileInlineJavaScript(div.childNodes[i])
            else if (div.childNodes[i].length) traverseNode(div.childNodes[i], function () { compileInlineJavaScript(div.childNodes[i]); })
            this.nodes[z].appendChild(div.childNodes[i].cloneNode(true))
          }
        //traverseNode(div, function () { compileInlineJavaScript(div); })
      } else if (typeof node == "object") {
        if (/(HTML)/gi.test(node.toString())) {
          switch (/(Collection)/gi.test(node.toString())) {
            case true:
              loopAndExecuteReverse(this, arrNodes, this.nodes.appendChild);
              break;
            default:
              this.nodes.appendChild(node);
              break;
          }

        } else if (node instanceof Array) {
          loopAndExecuteReverse(this, node, this.nodes.appendChild);
        } else {
          throw new Error("Passed in node or array is non-irretable")
        }
      } else {
        throw new Error("Provdide Object or String Args")
      }
      return this;
    };
    __.prototype.after = function (value) {
      return insertNode.call(this, "afterend", value);
    }
    __.prototype.before = function (value) {
      return insertNode.call(this, "beforebegin", value);
    }
    __.prototype.replaceWith = function (value) {
      return insertNode.call(this, "beforebegin", value, true);
    }
    __.prototype.prepend = function (value) {
      return insertNode.call(this, "afterbegin", value);
    }
    __.prototype.children = function () {
      if (this.nodes instanceof Array) { 
        var kids = [];
        this.nodes.each(function (item) { 
          //if(item instanceof HTMLElement)
          kids = kids.concat(converToArray(item.children))
        })
        setCurrentNode(this,kids)
      } else 
       setCurrentNode(this, converToArray(this.nodes.children));
      return this;
    };
    __.prototype.remove = function () {
      this.nodes.forEach(function (value, index, array) {
        replaceNodeInArrayWithItsParent(value, array, index);
        value.parentElement.removeChild(value)
      });
      return this;
    };
    __.prototype.hide = function () {
      switch (this.nodes instanceof Array) {
        case true:
          loopAndExecute(this, this.nodes, function (node) {
            node.style.display = "none";
          })
          break;
        default:
          this.nodes.style.display = "none"
          break;
      }
      return this;
    };
    __.prototype.show = function () {
      switch (this.nodes instanceof Array) {
        case true:
          loopAndExecute(this, this.nodes, function (node) {
            node.style.display = "block";
          })
          break;
        default:
          this.nodes.style.display = "block"
          break;
      }
      return this;
    };
    __.prototype.toggleClass = function (className) {
      if (typeof className == "string") {
        switch (this.nodes instanceof Array) {
          case true:
            loopAndExecute(this, this.nodes, function (node) {
              node.classList.toggle(className)
            })
            break;
          default:
            this.nodes.classList.toggle(className);
            break;
        }
      }
      return this;
    };
    __.prototype.attr = function (attr, value) {
      if (typeof attr == "string" && typeof value != "undefined") {
        switch (this.nodes instanceof Array) {
          case true:
            loopAndExecute(this, this.nodes, function (node) {
              node.setAttribute(attr, value)
            })
            break;
          default:
            this.nodes.setAttribute(attr, value)
            break;
        }
      }
      return this;
    };
    __.prototype.removeAttr = function (attr) {
      if (typeof attr == "string") {
        switch (this.nodes instanceof Array) {
          case true:
            loopAndExecute(this, this.nodes, function (node) {
              node.removeAttribute(attr)
            })
            break;
          default:
            this.nodes.removeAttribute(attr);
            break;
        }
      }
      return this;
    };
    __.prototype.parent = function () {
      var parents = []
      this.each(function (item) { 
        parents.push(item.parentNode)
      })
      return new __(parents);
    }
    __.prototype.is = function (value) {
      var isSame = false;
      switch (typeof value == "string") { 
        case true:
          var testNode = document.createElement(value)
          isSame = this.nodes.every(function (item) { 
              item.tagName.toLowerCase() == testNode.tagName.toLowerCase()
          })
          break;
        default:
          isSame = this.nodes.every(function (item) { 
              item.isEqualNode(value)
          })  
          break;  
      }
      return isSame;
     }