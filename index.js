
/**
 * Module Dependencies
 */

var debug = require('debug')('duo-regenerator');
var regenerator = require('regenerator');

/**
 * Generator regex.
 */

var expr = /\bfunction\s*\*/;

/**
 * Regnerator runtime.
 */

var runtime = compile('', true);

/**
 * Export `plugin`.
 */

module.exports = plugin;

/**
 * Duo regenerator plugin.
 */

function plugin() {
  var first = true;
  return function regenerator(file, duo) {
    if ('js' != file.type) return;
    if (!expr.test(file.src)) return;

    if (first) {
      debug('adding facebook/regenerator\'s runtime');
      duo.include('regenerator-runtime', runtime);
      first = false;
    }

    debug('transforming %s to ES5', file.id);
    file.src = 'require("regenerator-runtime");\n\n'
             + compile(file.src);
  };
}

function compile(js, includeRuntime) {
  includeRuntime = includeRuntime || false;
  return regenerator.compile(js, { includeRuntime: includeRuntime }).code;
}
