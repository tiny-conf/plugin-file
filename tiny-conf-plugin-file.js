'use strict';

var fs = require('fs');

module.exports = function (config, filepath) {
  config.set(JSON.parse(fs.readFileSync(filepath, 'utf8')));
};
