// why does this not work
// import _ from 'lodash';
var _ = require('lodash');
var Generator = require('yeoman-generator');

// http://www.alwaystwisted.com/articles/using-lists-in-a-yeoman-generator

// Files to Create
// Component/
// Component/index.js
// Component/Component.js
// Component/Component.stories.js
// Component/Component.module.scss

module.exports = class extends Generator {
  paths() {
    // If we are within the generator-project, we want all the newly generated files to be in the public directory for testing
    // WHEN YOU ARE IN PROMPTING STAGE AND TRY TO LOG THE DESTINATION ROOT, YOU WILL NOT SEE THE MOST UP TO DATE DESTINATION ROOT. HOWEVER ONCE YOU ARE IN THE WRITING STAGE, YOU WILL SEE THE RIGHT DESTINATION ROOT
    if (_.includes(this.contextRoot, 'generator-project') && !_.includes(this.destinationRoot(), 'generator-project/public')) {
      this.destinationRoot('public/');
    }
  }

  // this.prompt(...).then(responses => this.answers = responses)
  async prompting() {
    const oneOffPrompts = [
      {
        type: 'confirm',
        name: 'confirmEverythingOK',
        message: `Before you do anything, check where you are.\n
If you are inside the generator('~/.../generator-project/'), you will need to make some code changes. In the writing section, you will need to prepend the destinationPath with 'public', so the folders and files are created in the public directory. \n
If you are within the project you are working in, make sure you you stay in the root.`
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'list',
        name: 'componentBase',
        message: 'What is your project going to be called',
        choices: [ "Component", "Page" ],
        store: true
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'list',
        name: 'componentBase',
        message: 'Where would you like to create the new project? By default, you will create here',
        store: true
      },
    ];


    // answers is an object, so you will have to either use assign or merge to combine assigns from multiple prompt calls
    const answers = await this.prompt(oneOffPrompts);
    const moreAnswers = answers.addNewProp && await askPropPrompts(propsPrompts);

    this.answers = await _.merge(answers, { props: moreAnswers});
  }

  writing() {
    // cd into the right spot
    // check node -v
    // npm install
    // storybook
    // eslint

  }
};
