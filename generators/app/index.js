'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var extension = {
  thymeleaf: "html",
  freemarker: "ftl"
}

var renderEngineLib = {
  thymeleaf: "com.enonic.xp:lib-thymeleaf:${xpVersion}",
  freemarker: "com.github.tineikt:xp-lib-freemarker:+",
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name of application?',
      default: this.appname
    }, {
      type: 'input',
      name: 'group',
      message: 'Group ID?',
      default: 'com.example.app',
      store: true
    }, {
      type: 'input',
      name: 'version',
      message: 'Enonic XP version?',
      default: '6.9.1',
      store: true
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
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // Readme
    this.fs.copyTpl(
      this.templatePath('_misc/_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );

    // Gradle files
    this.fs.copyTpl(
      this.templatePath('_gradle/_settings.gradle'),
      this.destinationPath('settings.gradle'), {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_gradle/_gradle.properties'),
      this.destinationPath('gradle.properties'), {
        group: this.props.group,
        name: this.props.name,
        version: this.props.version
      }
    );

    this.fs.copy(
      this.templatePath('_gradle/_gradlew'),
      this.destinationPath('gradlew')
    );

    this.fs.copyTpl(
      this.templatePath('_gradle/_build.gradle'),
      this.destinationPath('build.gradle'), {
        renderEngine: this.props.renderEngine,
        renderEngineLib : renderEngineLib[this.props.renderEngine]
      }
    );

    this.fs.copy(
      this.templatePath('_gradle/_wrapper/gradle-wrapper.properties'),
      this.destinationPath('gradle/wrapper/gradle-wrapper.properties')
    );

    this.fs.copy(
      this.templatePath('_gradle/_wrapper/gradle-wrapper.jar'),
      this.destinationPath('gradle/wrapper/gradle-wrapper.jar')
    );

    // Copy resources
    this.fs.copy(
      this.templatePath('_resources/_site.xml'),
      this.destinationPath('src/main/resources/site/site.xml')
    );

    this.fs.copyTpl(
      this.templatePath('_resources/_pages/_default/_default.' + extension[this.props.renderEngine]),
      this.destinationPath('src/main/resources/site/pages/default/default.' + extension[this.props.renderEngine]), {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_resources/_pages/_default/_default.js'),
      this.destinationPath('src/main/resources/site/pages/default/default.js'), {
        renderEngine: this.props.renderEngine,
        templateExtension: extension[this.props.renderEngine]
      }
    );

    this.fs.copyTpl(
      this.templatePath('_resources/_pages/_default/_default.xml'),
      this.destinationPath('src/main/resources/site/pages/default/default.xml')
    );
  },

  install: function () {
    // this.installDependencies(); // Only if using NPM/bower dependencies
  }
});
