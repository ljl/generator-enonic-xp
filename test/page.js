'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-enonic-xp:page', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/page'))
      .withPrompts({pagename: 'hello'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'src/main/resources/site/pages/hello/hello.html',
      'src/main/resources/site/pages/hello/hello.xml',
      'src/main/resources/site/pages/hello/hello.js'
    ]);
  });
});
