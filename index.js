
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

var runtime = regenerator('', { includeRuntime: true });

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
    file.src = render(file.src);
  };
}

/**
 * Render the given `js` to ES5.
 */

function render(js) {
  return 'require("regenerator-runtime");\n\n' + regenerator(js);
}
