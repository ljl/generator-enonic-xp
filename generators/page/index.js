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
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the perfect ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'pagename',
      message: 'Name of page?',
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
    var pageExtensions = ['xml', 'js', extension[this.props.renderEngine]];
    var that = this;
    pageExtensions.forEach(function (ext) {
      var dest = 'src/main/resources/site/pages/' + that.props.pagename + '/' + that.props.pagename + '.' + ext;
      that.template('_page/_page.' + ext + '.ejs', dest, {
        name: that.props.pagename,
        renderEngine: that.props.renderEngine,
        templateExtension: extension[that.props.renderEngine]
      });
    });
  },

  install: function () {
    // this.installDependencies();
  }
});
