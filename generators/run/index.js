'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    // Defaults
    let options = {
      'django': false
    };

    // Overrides
    Object.assign(options, this.options);

    // Use shared templates
    this.fs.copyTpl(
      this.templatePath('run'),
      this.destinationPath('run'),
      options
    );
  }
};
