
var numbers = require('./numbers');

var gen = numbers(6);
for (var i = 0; i < 6; i++) {
  console.log(gen.next().value)
}
