'use strict';

var fs = require('fs');

module.exports = function (config, filepath) {
  config.set(JSON.parse(fs.readFileSync(filepath, 'utf8')));

  config.save = function saveToFile(key) {
    return new Promise(function (resolve, reject) {
      fs.readFile(filepath, 'utf-8', function (err, fileConf) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(fileConf));
        }
      });
    }).then(function (fileConf) {
      var data = fileConf;
      if (key) {
        data[key] = config.get(key);
      }
      var strData = JSON.stringify(data, null, 2);
      return new Promise(function (resolve, reject) {
        fs.writeFile(filepath, strData, 'utf-8', function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  };
};
