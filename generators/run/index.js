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

    if (fs.existsSync(this.destinationPath('package.json'))) {
      prompts.push(
        {
          type    : 'confirm',
          name    : 'updateDevDependencies',
          message : 'Should we update "devDependencies" in package.json?'
        }
      );
      prompts.push(
        {
          type    : 'confirm',
          name    : 'updateScripts',
          message : 'Should we update "scripts" in package.json?'
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

    // package,json
    if (! fs.existsSync(this.destinationPath('package.json'))) {
      // Copy default package.json
      this.fs.copy(
        this.templatePath('package.json'),
        this.destinationPath('package.json')
      );
    } else if (this.answers.updateDevDependencies || this.answers.updateScripts) {
      // We're updating package.json, so parse contents of both new and old package.json
      const currentJson = fs.readFileSync(this.destinationPath('package.json'), 'utf8');
      const incomingJson = fs.readFileSync(this.templatePath('package.json'), 'utf8');
      const packageContents = JSON.parse(currentJson);
      const incomingPackageContents = JSON.parse(incomingJson);

      // Update devDependencies if requested
      if (this.answers.updateDevDependencies) {
        console.log('here');
        const currentDevDependencies = packageContents['devDependencies'] || {};
        const incomingDevDependencies = incomingPackageContents['devDependencies'];
        const updatedDevDependencies = util._extend(currentDevDependencies, incomingDevDependencies);
        packageContents['devDependencies'] = updatedDevDependencies;
      }

      // Update scripts if requested
      if (this.answers.updateScripts) {
        const currentScripts = packageContents['scripts'] || {};
        const incomingScripts = incomingPackageContents['scripts'];
        const updatedScripts = util._extend(currentScripts, incomingScripts);
        packageContents['scripts'] = updatedScripts;
      }

      const updatedJson = JSON.stringify(packageContents, null, 2);
      fs.writeFileSync(
        this.destinationPath('package.json'),
        updatedJson,
        'utf8'
      );
    }
  }
};
