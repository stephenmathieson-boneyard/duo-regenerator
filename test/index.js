
var Duo = require('duo');
var assert = require('assert');
var vm = require('vm');
var fmt = require('util').format;
var path = require('path');
var example = path.join.bind(path, __dirname, '..', 'examples');
var regenerator = require('..');

describe('duo-regenerator', function () {
  it('should work with examples/generator', function (done) {
    var duo = create('generator');
    duo.run(function (err, js) {
      if (err) return done(err);

      var args = [];
      var ctx = vm.createContext({
        console: { log: function (msg) {
            args.push(msg);
        }}
      });
      vm.runInContext(js, ctx);
      assert.deepEqual(args, ['foo', 'bar']);
      done();
    });
  });

  it('should work with examples/requires', function (done) {
    var duo = create('requires');
    duo.run(function (err, js) {
      if (err) return done(err);
      var numbers = [];
      var ctx = vm.createContext({
        console: { log: function (n) {
          numbers.push(n);
        }}
      });
      vm.runInContext(js, ctx);
      assert.deepEqual(numbers, [0, 1, 2, 3, 4, 5]);
      done();
    });
  });
});

function create(name) {
  var duo = Duo(example(name));
  duo.entry(path.join(example(name), 'index.js'));
  duo.use(regenerator());
  return duo;
}
