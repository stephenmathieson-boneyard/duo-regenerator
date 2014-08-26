
var co = require('visionmedia/co');
var sleep = require('eugeneware/co-sleep');

co(function *() {
  var start = +new Date;
  yield sleep(100);
  var end = +new Date;
  console.log('slept for %d ms', end - start);
})();
