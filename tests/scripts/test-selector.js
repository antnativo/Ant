QUnit.test("Selector", function (assert) {   
  assert.equal($ant("div#head")[0],$("div#head")[0],"Should select the same node as jQuery")
  assert.equal($ant('body').length, 1, "Should select BODY from string argument")
  assert.ok($ant('body')[0].isSameNode(document.body), "The body selected for using $ant should be the same as document.body")
  assert.equal($("table tbody tr").length, $ant('table tbody tr').length, "jQuery selection of a row in a table should be the same as $ant")
  assert.equal($ant($("div")).length, $("div").length, "Should be able to select nodes using jQuery as selector in $ant")
  assert.equal($ant(document.body)[0], document.body, "Should be able to select node using DOM API")
  assert.equal($ant($ant(document.body))[0], document.body, "Should be able to select nodes from $ant")
  assert.ok($ant(document,$ant('iframe').contents()).find('body')[0].isSameNode(document.getElementsByTagName('iframe')[0].contentWindow.document.body),"Should get Document in iFrame")
  document.getElementsByTagName('iframe')[0].contentWindow.document.body.innerHTML = "Hello"
  assert.equal($ant('body', $ant('iframe').contents()).html(), "Hello", "Should get the inner html of body in iframe");
  document.getElementsByTagName('iframe')[0].contentWindow.document.body.innerHTML = ""  
  assert.equal($ant(Array.prototype.slice.apply(document.getElementsByTagName("div")) ).length,Array.prototype.slice.apply(document.getElementsByTagName("div")).length, "Should get nodes using an array");
})