'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-enonic-xp:part', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/part'))
      .withPrompts({partname: 'my-part'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'src/main/resources/site/parts/my-part/my-part.html',
      'src/main/resources/site/parts/my-part/my-part.js',
      'src/main/resources/site/parts/my-part/my-part.xml'
    ]);
  });
});
