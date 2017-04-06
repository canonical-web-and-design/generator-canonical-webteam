'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(
      require.resolve('../run'),
      {django: true, db: true}
    );
  }
};

