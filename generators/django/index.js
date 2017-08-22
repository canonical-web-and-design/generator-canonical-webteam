'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(
      require.resolve('../run')
    );
  }

  prompting() {
    let prompts = []

    prompts.push(
      {
        type    : 'input',
        name    : 'projectName',
        message : 'What is the name of this project?'
      }
    );

    prompts.push(
      {
        type    : 'port',
        name    : 'port',
        message : 'What local port should this project run on?'
      }
    );

    return this.prompt(prompts).then(
      (answers) => {
        this.answers = answers;
      }
    );
  }

  writing() {
    // The run script itself
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath('.'),
      this.answers
    );
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath('.'),
      this.answers
    );
  }
};
