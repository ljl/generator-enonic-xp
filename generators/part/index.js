'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var extension = {
  thymeleaf: "html",
  freemarker: "ftl"
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the perfect ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'partname',
      message: 'Name of part?',
      default: 'null'
    }, {
      type: 'list',
      name: 'renderEngine',
      message: 'Render engine?',
      choices: [{
        value: 'thymeleaf',
        name: 'Thymeleaf'
      }, {
        value: 'freemarker',
        name: 'Freemarker'
      }],
      default: 'thymeleaf',
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var partExtensions = ['xml', 'js', extension[this.props.renderEngine]];
    var that = this;
    partExtensions.forEach(function (ext) {
      var dest = 'src/main/resources/site/parts/' + that.props.partname + '/' + that.props.partname + '.' + ext;
      that.template('_part/_part.' + ext, dest, {
        name: that.props.partname,
        renderEngine: that.props.renderEngine,
        templateExtension: extension[that.props.renderEngine]
      });
    });
  },

  install: function () {
    // this.installDependencies();
  }
});
