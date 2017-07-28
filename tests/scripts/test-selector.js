QUnit.test("Selector : true", function (assert) { 
  assert.ok(true, "True")
  assert.ok($ant("div#head").length, "Ant Should select the same node as jQuery")
})