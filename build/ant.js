var $ant;
(function () {
  $ant.query = (function () { 
function __(nodes,context) {
      this.nodes;
      this.document = context;
      this.history = [];
      this.find(nodes);
      this.length = this.nodes.length;
      return this;
    }
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
// PRIVATE //
    function compileScripts(item) {
      var scripts = converToArray(item.getElementsByTagName("script"));
      var count = scripts.length - 1;
      while (count >= 0) {
        window.eval(scripts[count].textContent);
        count--;
      }
    }
    function insertHTMLAndJS(self, value, node, noCompile) {
      var el = (typeof node != "undefined" && node != null) ? node : self.nodes;
      el.innerHTML = value;
      ((typeof noCompile != undefined || noCompile == null) && noCompile == true) ? compileScripts(el) : null;
    }
    function loopAndExecuteReverse(self, item, func) {
      var counter = 0,
        endpoint = item.length - 1;
      while (counter <= endpoint) {
        func(item[counter])
        counter++;
      }
    }
    function loopAndExecute(self, item, func) {
      var counter = item.length - 1;
      while (counter >= 0) {
        func(item[counter])
        counter--;
      }
    }
    // Used to clone script node and append it to the dom. Set onload event handler to removeScriptNodeOnLoad, which removes node -- AC 5/26/2016
    // Used to remove script node once node is loaded -- AC 5/26/2016
    function removeScriptNodeOnLoad(e) {
      document.head.removeChild(e.target)
    }
    function createScriptNodeFromNode(node) {
      var jsnode = document.createElement("script")
      jsnode.src = node.src;
      jsnode.type = (node.type) ? node.type : "text/javascript";
      jsnode.onload = removeScriptNodeOnLoad;
      jsnode.onerror = removeScriptNodeOnLoad;
      document.head.appendChild(jsnode)
    }
    function compileInlineJavaScript(el) {
      if (typeof el != "undefined" && typeof el.nodeName != "undefined" && el.nodeName != null && el.nodeName.toUpperCase().localeCompare('SCRIPT') == 0 && (!el.type || el.type.localeCompare('text/javascript') == 0) && !el.src) {
        window['eval'].call(window, el.innerHTML)
        return true;
      } else if (typeof el != "undefined" && typeof el.nodeName != "undefined" && el.nodeName != null && el.nodeName.toUpperCase().localeCompare('SCRIPT') == 0 && (!el.type || el.type.localeCompare('text/javascript') == 0) && el.src) { // Added Condition to find script nodes with src  -- AC 5/26/2016
        createScriptNodeFromNode(el) // Used to load external script and remove node once loaded -- AC 5/26/2016
        return true;
      }
      return false;
    }
    function traverseNode(node, fun) {
      if (typeof node != "undefined") {
        fun(node) // Doc: If script tag with inline code, parse
        for (var i = 0, len = node.childNodes.length; i < len; i++)
          traverseNode(node.childNodes[i], fun) //Doc: determine each child if they are script tags with inline code. If not find the child's children --AC 5/23/16
      }
    }
    function insertNode(location, value, removeNode) {
      //supported on IE 8 -- AC 6/3/2017
      if (!value)
        return this;
      var el = document.createElement("div")
      el.innerHTML = value;
      nodesThatWillBeInserted = converToArray(el.children)
      this.nodes.forEach(function (node, index, array) {
        if (removeNode) node.style.display = "none"
        switch (value.constructor.name) {
          case "String":
            node.insertAdjacentHTML(location, value)
            break;
          case HTMLCollection:
          case HTMLElement:
            node.insertAdjacentElement(location, value)
            break;
        }
        if (removeNode)
          nodesThatWillBeInserted.forEach(function (value1, index1, array1) {
            replaceNodeInArrayWithAnother.call(this, { "originalNode": node, "newNode": value1, "array": array, "index": index })
          })
      })
      traverseNode(el, compileInlineJavaScript)
      el = null;
      return this;
    }
    function replaceNodeInArrayWithAnother(obj) {
      if (!obj.array)
        obj.array = this.nodes;
      if (typeof obj.index == "undefined")
        obj.index = obj.array.indexOf(obj.originalNode);
      else if (obj.array.indexOf(obj.originalNode) == -1)
        obj.index = obj.array.length;
      if (obj.array.indexOf(obj.newNode) != -1)
        obj.array.splice(index, 1)
      else {
        obj.array[obj.index] = obj.newNode
        if (obj.originalNode.parentElement)
          obj.originalNode.parentElement.removeChild(obj.originalNode)
      }
    }
    function replaceNodeInArrayWithItsParent(node, array, index) {
      var parent = node.parentElement;
      if (array.indexOf(parent) == -1)
        if (index)
          array[index] = parent;
        else
          array[array.indexOf(node)] = parent;
      else
        if (index)
          array.splice(index, 1)
        else
          array.splice(array.indexOf(node), 1)
    }
    // End of PRIVATE //
    //Return new  __()
return function (nodes, context) {
    var doc = (context) ? context : document;
      return new __(nodes,doc);
    }
   })();
   $ant = $ant.query;
})($ant || ($ant={}))