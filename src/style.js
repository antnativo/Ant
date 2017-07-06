__.prototype.css = function (rule, value) { 
  rule = rule.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  this.forEach(function (node) { 
    node.style[rule] = value;
  })
  return this;
}