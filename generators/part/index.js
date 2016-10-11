'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the perfect ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'partname',
      message: 'Name of part?',
      default: 'null'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var partExtensions = ['xml', 'js', 'html'];
    var that = this;
    partExtensions.forEach(function (ext) {
      var dest = 'src/main/resources/site/parts/' + that.props.partname + '/' + that.props.partname + '.' + ext;
      that.template('_part/_part.' + ext, dest, {
        name: that.props.partname
      });
    });
  },

  install: function () {
    // this.installDependencies();
  }
});
