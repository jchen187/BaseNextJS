// why does this not work
// import _ from 'lodash';
var _ = require('lodash');
var Generator = require('yeoman-generator');
var {exec} = require('child_process');

// http://www.alwaystwisted.com/articles/using-lists-in-a-yeoman-generator

// Files to Create
// Component/
// Component/index.js
// Component/Component.js
// Component/Component.stories.js
// Component/Component.module.scss

module.exports = class extends Generator {
  // this.prompt(...).then(responses => this.answers = responses)
  async prompting() {
    this.log("Base NextJS Generator");
    const baseComponentChoices = [ "Project", "Component", "Page", "API" ];
    const oneOffPrompts = [
      {
        type: 'confirm',
        name: 'runNpmLink',
        message: 'Did you run npm link?',
        default: false,
        store: true
      },
      {
        /*
        when: function (response) {
          return response.confirmEverythingOK;
        },
        */
        type: 'list',
        name: 'baseComponent',
        message: 'What would you like to create?',
        choices: baseComponentChoices,
        store: true
      }
    ];

    // answers is an object, so you will have to either use assign or merge to combine assigns from multiple prompt calls
    const promptAnswers = await this.prompt(oneOffPrompts);
    this.answers = _.merge(promptAnswers, { baseComponentChoices });
  }

  writing() {
    const {
      baseComponent,
      baseComponentChoices,
      runNpmLink
    } = this.answers;

    // Project: runNpmLink ? 'yo base:project' : 'yo ./generator-base/project',
    const commandList = _.reduce(baseComponentChoices, (acc, choice) => {
      // lowercase strips all /s and .s
      const choiceInLowerCase = _.lowerCase(choice);
      acc[choice] = runNpmLink ? `yo base:${choiceInLowerCase}` : `yo ./generator-base/${choiceInLowerCase}`;
      return acc;
    }, {});

    const command = _.get(commandList, baseComponent);
    exec('pwd', (error, stdout, stderr) => {
      // Confirmed we are in the right spot
      this.log(stdout);
    });

    // Debugging
    this.log(this.answers);
    this.log(command);

    exec(command, (error, stdout, stderr) => {
      this.log(stdout);
      this.log('Exec or spawn?');
    });
    //exec command;
  }
};
