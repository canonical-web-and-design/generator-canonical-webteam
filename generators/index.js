'use strict';
const Generator = require('yeoman-generator');
const introduction = `
Available scripts:

- run: Installs the basic ./run script for running yarn with docker
- run-django: Install the ./run script for a Django project

To run one, type:

yo canonical-webteam:{script-name}
`

module.exports = class extends Generator {
  initializing() {
    console.log(introduction);
    process.exit();
  }
};
