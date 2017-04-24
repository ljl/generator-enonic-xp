'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var configFields = [];

var extension = {
  thymeleaf: "html",
  freemarker: "ftl"
}

module.exports = yeoman.Base.extend({
  prompting: {
    init: function () {
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
    config: askForFields
  },

  writing: function () {
    var partExtensions = ['xml', 'js', extension[this.props.renderEngine]];
    var that = this;
    partExtensions.forEach(function (ext) {
      var dest = 'src/main/resources/site/parts/' + that.props.partname + '/' + that.props.partname + '.' + ext;
      that.template('_part/_part.' + ext + '.ejs', dest, {
        name: that.props.partname,
        renderEngine: that.props.renderEngine,
        templateExtension: extension[that.props.renderEngine],
        fields: configFields
      });
    });
  },

  install: function () {
    // this.installDependencies();
  }
});

// TODO: Refactor into shared file
function askForFields() {
  var cb = this.async();
  askForField.call(this, cb);
}

function askForField(cb) {
  var that = this;
  var prompts = [{
    type: 'confirm',
    name: 'fieldAdd',
    message: 'Do you want to add config field to your part?',
    default: true
  }, {
    when: function (response) {
      return response.fieldAdd === true;
    },
    type: 'input',
    name: 'fieldName',
    message: 'What is the name of your field?'
  }, {
    when: function (response) {
      return response.fieldAdd === true;
    },
    type: 'list',
    name: 'fieldType',
    message: 'What is the type of your field?',
    choices: [{
      value: 'TextLine',
      name: 'TextLine'
    }, {
      value: 'TextArea',
      name: 'TextArea'
    }, {
      value: 'ContentSelector',
      name: 'ContentSelector'
    }, {
      value: 'HtmlArea',
      name: 'HtmlArea'
    }, {
      value: 'Tag',
      name: 'Tag'
    }, {
      value: 'Checkbox',
      name: 'Checkbox'
    }, {
      value: 'ImageSelector',
      name: 'ImageSelector'
    }],
    default: 0
  }, {
    when: function (response) {
      return response.fieldAdd === true;
    },
    type: 'number',
    name: 'fieldMaxOccurrences',
    message: 'How many maximum occurrences?',
    default: 1
  }, {
    when: function (response) {
      return response.fieldAdd === true;
    },
    type: 'number',
    name: 'fieldMinOccurrences',
    message: 'How many minimum occurrences?',
    default: 0
  }];

  return this.prompt(prompts).then(function (props) {
    if (props.fieldAdd) {
      var field = {
        fieldName: props.fieldName,
        fieldType: props.fieldType,
        fieldMaxOccurrences: props.fieldMaxOccurrences,
        fieldMinOccurrences: props.fieldMinOccurrences
      };
      configFields.push(field);
    }
    if (props.fieldAdd) {
      askForField.call(that, cb);
    } else {
      cb();
    }
  });
}
