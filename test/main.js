'use strict';

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
});
