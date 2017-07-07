__.prototype.css = function (rule, value) { 
  rule = rule.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  this.forEach(function (node) { 
    node.style[rule] = value;
  })
  return this;
}
__.prototype.addClass = function (className) { 
  this.forEach(function (node) { 
    node.classList.add( className );
  })
  return this;
}
__.prototype.removeClass = function (className) { 
  this.forEach(function (node) { 
    node.classList.remove( className );
  })
  return this;
}
__.prototype.toggleClass = function (className) { 
  this.forEach(function (node) { 
    node.classList.remove( className );
  })
  return this;
}
__.prototype.toggle = function (className) { 
  this.forEach(function (node) { 
    node.style.visibility = (node.style.visibility != "visible") ? "visible" : hidden;
  })
  return this;
}