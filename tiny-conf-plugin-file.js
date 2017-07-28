'use strict';

var fs = require('fs');

module.exports = function (config, filepath) {
  config.set(JSON.parse(fs.readFileSync(filepath, 'utf8')));

  config.save = function saveToFile() {
    var data = JSON.stringify(config.get(), null, 2);
    return new Promise(function (resolve, reject) {
      fs.writeFile(filepath, data, 'utf-8', function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
};
