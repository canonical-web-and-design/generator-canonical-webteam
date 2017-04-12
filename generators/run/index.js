'use strict';

// Core packages
const fs = require('fs');

// Third-party packages
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    let prompts = []

    if (fs.existsSync(this.destinationPath('.gitignore'))) {
      prompts.push(
        {
          type    : 'confirm',
          name    : 'updateGitignore',
          message : 'Should we update .gitignore?'
        }
      );
    }

    return this.prompt(prompts).then(
      (answers) => {
        this.answers = answers;
      }
    );
  }

  writing() {
    // Defaults
    let options = {
      'django': false
    };

    // Overrides
    Object.assign(options, this.options);

    // The run script itself
    this.fs.copyTpl(
      this.templatePath('run'),
      this.destinationPath('run'),
      options
    );

    // .gitignore
    if (! fs.existsSync(this.destinationPath('.gitignore'))) {
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    } else {
      if (this.answers.updateGitignore) {
        const currentContents = fs.readFileSync(this.destinationPath('.gitignore'), 'utf8');
        const currentLines = currentContents.split(/\r?\n/).filter(line => line != "").filter(line => ! line.match(/^#/)).map(line => line.trim());
        const incomingContents = fs.readFileSync(this.templatePath('.gitignore'), 'utf8');
        const incomingLines = incomingContents.split(/\r?\n/).filter(line => line != "").map(line => line.trim());
        let newLines = [];

        incomingLines.forEach(function(line) {
          if (currentLines.indexOf(line) == -1) {
            newLines.push(line);
          }
        });

        if (newLines.length > 0) {
          const updatedContents = currentContents + '\n' + newLines.join('\n');

          fs.writeFileSync(
            this.destinationPath('.gitignore'),
            updatedContents,
            'utf8'
          );
        }
      }
    }
  }
};
