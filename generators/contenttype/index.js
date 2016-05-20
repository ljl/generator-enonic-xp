'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the superb ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Contenttype name?',
      default: 'content'
    }, {
      type: 'confirm',
      name: 'continue',
      message: 'continue?',
      default: true
    }, {
      when: function (response) {
        return response.continue;
      },
      type: 'input',
      name: 'supertype',
      message: 'Supertype?',
      default: 'base:structured'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    /*
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
  },

  install: function () {
    // this.installDependencies();
  }
});
