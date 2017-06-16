var log={};
function logThis(obj){
  (log[obj.name]) ? log[obj.name].push(obj) : ( log[obj.name] = [], log[obj.name].push(obj));
}

// LOGGING TESTING AND DO SOMETHING WITH IT
QUnit.log(logThis);
QUnit.testDone(function(complete){
  (typeof console != "undefined") ? console.log("Complete: ", complete.name,", passed : "+complete.passed, ", failed: "+ complete.failed) : "";
  //for (var key in complete)
    //(typeof console != "undefined") ? console.log(key, " : ", complete[key]) : "";
});
QUnit.done(function (total) {
    for (var key in total)
    (typeof console != "undefined") ? console.log(key, " : ", total[key]) : "";
  //(typeof console != "undefined")  ? console.log("Log: ",log) :"";
});