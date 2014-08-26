
module.exports = numbers;

function *numbers(n) {
  for (var i = 0; i < n; i++) yield i;
}
