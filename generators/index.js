'use strict';
const Generator = require('yeoman-generator');
const introduction = `
Available scripts:

- django: Create a basic Django website project
- run: Installs the ./run script for running projects with Docker

To run one, type:

yo canonical-webteam:{script-name}
`

module.exports = class extends Generator {
  initializing() {
    console.log(introduction);
    process.exit();
  }
};
