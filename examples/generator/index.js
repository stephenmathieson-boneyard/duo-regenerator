
var bar = foo();
var val;
while ((val = bar.next()) && (!val.done)) {
  console.log(val.value);
}

function *foo() {
  yield 'foo';
  yield 'bar';
}
