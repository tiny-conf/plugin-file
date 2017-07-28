'use strict';

const fs = require('fs');
const tmp = require('tmp');
const path = require('path');
const expect = require('expect');
const conf = require('tiny-conf');
const confFile = require('../tiny-conf-plugin-file');

describe('main tests', function () {

  beforeEach(function () {
    conf.clear();
  });

  it('should load data from file', function () {
    confFile(conf, path.join(__dirname, 'fixtures', 'conf0.json'));

    expect(conf.get('foo')).toEqual('bar');
    expect(conf.get('baz.one')).toEqual(42);
    expect(conf.get('baz.two')).toEqual(['Hello', 'World']);
  });

  it('should save data to file', function () {
    // writing data from fixtures/conf0.json to /tmp
    const config = conf.set(require('./fixtures/conf0.json'));
    const newConfPath = tmp.tmpNameSync();
    fs.writeFileSync(newConfPath, config, 'utf-8');

    // read conf from /tmp
    confFile(conf, newConfPath);

    // be sure the cp to new-conf0.json worked
    expect(conf.get('foo')).toEqual('bar');
    expect(conf.get('baz.one')).toEqual(42);
    expect(conf.get('baz.two')).toEqual(['Hello', 'World']);

    // modify content
    conf.set('baz', 'nope');

    // save content
    return conf.save()
      .then(() => {
        expect(conf.get('foo')).toEqual('bar');
        expect(conf.get('baz')).toEqual('nope');
      });
  });
});
