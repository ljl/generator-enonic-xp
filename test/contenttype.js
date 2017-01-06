'use strict';
var path = require('path');
// var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-enonic-xp:contenttype', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/contenttype'))
      .withPrompts({
        name: 'my-part',
        supertype: 'base:structured',
        fieldAdd: false
      }).toPromise();
  });

  it('creates files', function () {
    /*
    assert.file([
      'src/main/resources/site/content-types/my-type/my-type.xml'
    ]);
    */
  });
});
