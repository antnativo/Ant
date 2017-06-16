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