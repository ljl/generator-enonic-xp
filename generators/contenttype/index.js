'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inputFields = [];

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.log(yosay(
      'Welcome to the superb ' + chalk.red('generator-enonic-xp') + ' generator!'
    ));
  },
  prompting: {
    askForData: askForData,
    askForFields: askForFields
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_contenttypes/_contenttype.xml'),
      this.destinationPath('src/main/resources/site/content-types/' + this.props.name + '/' + this.props.name + '.xml'), {
        name: this.props.name,
        supertype: this.props.supertype,
        allowChildren: this.props.allowChildren,
        fields: inputFields
      }
    );
  }
});

function askForData() {
  var prompts = [{
    type: 'input',
    name: 'name',
    message: 'Contenttype name?',
    default: 'content'
  }, {
    type: 'input',
    name: 'supertype',
    message: 'Supertype?',
    default: 'base:structured'
  }, {
    type: 'confirm',
    name: 'allowChildren',
    message: 'Allow child content?',
    default: true
  }];

  return this.prompt(prompts).then(function (props) {
    // To access props later use this.props.someAnswer;
    this.props = props;
    this.async();
  }.bind(this));
}

function askForFields() {
  var cb = this.async();
  askForField.call(this, cb);
}

function askForField(cb) {
  var that = this;
  var prompts = [{
    type: 'confirm',
    name: 'fieldAdd',
    message: 'Do you want to add a field to your contenttype?',
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
      inputFields.push(field);
    }
    if (props.fieldAdd) {
      askForField.call(that, cb);
    } else {
      cb();
    }
  });
}
