'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    // Use shared templates
    this.fs.copyTpl(
      this.templatePath('run'),
      this.destinationPath('run')
    );
  }
};
