// why does this not work
// import _ from 'lodash';
var _ = require('lodash');
var Generator = require('yeoman-generator');

// http://www.alwaystwisted.com/articles/using-lists-in-a-yeoman-generator

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
        message: 'What do you want to create?',
        choices: [ "Component", "Page" ],
        store: true
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'input',
        name: 'componentName',
        message: 'Enter a name for the new component (i.e.: MyNewComponent): ',
        default: 'DefaultComp',
        store: false,
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'list',
        name: 'componentType',
        message: 'How would you like the component?',
        choices: [{
          name: 'Dumb Component',
          value: 'dumbComponent'
        },{
          name: 'State Component (Class)',
          value: 'stateComponent'
        }],
        store: true
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: "confirm",
        name: "enableStorybook",
        message: "Would you like to enable storybook?",
        store: false
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: "confirm",
        name: "enableCustomStyles",
        message: "Would you like to create custom styles file?",
        default: false,
        store: false,
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'checkbox',
        name: 'npmModules',
        message: 'What npm modules would you like to use?',
        choices: [{
          name: 'React',
          value: 'react',
          checked: true
        }, {
          name: 'PropTypes',
          value: 'proptypes',
          checked: true
        }, {
          name: 'ClassNames',
          value: 'classnames',
          checked: true
        }, {
          name: 'Redux',
          value: 'redux',
          checked: false
        }, {
          name: 'Lodash',
          value: 'lodash',
          checked: true
        }, {
          name: 'GSAP',
          value: 'gsap',
          checked: false
        }],
        store: false,
      },
      {
        when: function (response) {
          return response.confirmEverythingOK;
        },
        type: 'confirm',
        name: 'addNewProp',
        message: 'Would you like to add a new prop?',
        default: 'true',
        store: false,
      },
    ];

    const propsPrompts = [
      {
        type: "input",
        name: "propName",
        message: "What is the prop name?",
        validate: input => !!input,
        store: false,
      },
      {
        when: function (response) {
          return response.propName;
        },
        type: 'list',
        name: 'propType',
        message: 'What would the propType be?',
        choices: [{
          name: 'Boolean',
          value: 'bool'
        },{
          name: 'String',
          value: 'string'
        },{
          name: 'Array',
          value: 'array'
        },{
          name: 'Node',
          value: 'node'
        },{
          name: 'Other',
          value: 'other'
        }],
        store: false,
      },
      {
        when: function(response) {
          return response.propName && response.propType === 'other';
        },
        type: 'input',
        name: 'otherPropType',
        message: 'If none of the propTypes are to your liking, what would you like?',
        validate: input => !!input,
      },
      {
        when: function(response) {
          return response.propName;
        },
        type: "confirm",
        name: "enableDefaultProps",
        message: "Would you like to enable the default proptypes?",
        store: true,
      },
      {
        when: function(response) {
          return response.propName && response.enableDefaultProps;
        },
        type: 'input',
        name: 'defaultValue',
        message: 'What value would you like this prop to default to?',
        validate: input => !!input,
        store: false,
      },
      {
        when: function(response) {
          return response.propName;
        },
        type: 'confirm',
        name: 'createAnotherProp',
        message: 'Would you like to add another prop?',
        default: false,
        store: false,
      }
    ];

    // ENTRY POINT
    this.log('Context Root: ' + this.contextRoot);
    this.log('Destination Root: ' + this.destinationRoot());
    this.log('Template Root: ' + this.sourceRoot());
    this.log('----------------------------');
    this.log('----------------------------');
    this.log('PROMPTING');
    this.log('----------------------------');
    this.log('----------------------------');

    let propsList = [];
    const askPropPrompts = (relevantPrompts) => {
      return this.prompt(relevantPrompts).then(answers => {
        propsList = _.concat(propsList, [{
          propName: answers.propName,
          propType: answers.otherPropType || answers.propType,
          defaultValue: answers.defaultValue,
        }]);
        return answers.createAnotherProp
          ? askPropPrompts(relevantPrompts)
          : propsList;
      });
    }

    /*
    const askPropPrompts = (relevantPrompts) => {
      const propsList = [];
      return this.prompt(relevantPrompts).then(answers => {
        const updatedPropsList = _.concat(propsList, [{
          propName: answers.propName,
          propType: answers.otherPropType || answers.propType,
          defaultValue: answers.defaultValue,
        }]);
        return answers.createAnotherProp
          ? askPropPrompts(relevantPrompts)
          : updatedPropsList;
      });
    }
    */

    // answers is an object, so you will have to either use assign or merge to combine assigns from multiple prompt calls
    const answers = await this.prompt(oneOffPrompts);
    const moreAnswers = answers.addNewProp && await askPropPrompts(propsPrompts);

    this.answers = await _.merge(answers, { props: moreAnswers});
  }

  writing() {
    if (true) {

    this.log('Updated Destination Root: ' + this.destinationRoot());
    // this.log("cool feature", this.answers.cool); // user answer `cool` used
    // this.log(this.sourceRoot()); // user answer `cool` used
    this.log('----------------------------');
    this.log('----------------------------');
    this.log("WRITING");
    this.log("this.answers is what gets returned from the prompting phase");
    this.log('----------------------------');
    this.log('----------------------------');
    this.log(_.get(this.answers,'confirmEverythingOK'));
    this.log(_.get(this.answers,'componentName'));
    this.log(_.get(this.answers,'componentType'));
    this.log(_.get(this.answers,'npmModules'));
    // this.log(_.get(this.answers,'npmModules.lodash'));
    this.log(_.includes(_.get(this.answers,'npmModules'), 'lodash'));
    this.log(this.answers);
    this.log('----------------------------');
    this.log('----------------------------');

    const componentBaseToFolderLocation = {
      Component: 'components', //src/javascript/components
      Page: 'pages' //src/javascript/pages
    };
    const componentFolder = _.get(componentBaseToFolderLocation, this.answers.componentBase);

    const templateToDestinationPathMap = {
      jsx: {
        componentTemplatePath: 'template.jsx',
        componentDestinationPath: componentFolder + '/' + this.answers.componentName + '/index.jsx',
      },
      styles: {
        componentTemplatePath: 'styles.scss',
        componentDestinationPath: componentFolder + '/' + this.answers.componentName + '/styles.scss',
      },
      storybook: {
        componentTemplatePath: 'storybook.js',
        componentDestinationPath: 'stories/' + this.answers.componentName + '.stories.js',
      }
    }

    if (this.answers.confirmEverythingOK) {
      const componentJSXFilePath = componentFolder + '/' + this.answers.componentName + '/index.jsx';

      this.fs.copyTpl(
        this.templatePath('template.jsx'), //within app/templates folder
        this.destinationPath(componentJSXFilePath),
        //this.destinationPath('public/' + componentJSXFilePath),
        this.answers
      );

      //This is what they had initially
      /*
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: 'Templating with Yeoman' }
      );
      */
    }

    if (this.answers.confirmEverythingOK && this.answers.enableCustomStyles) {
      //Component
      //--index.jsx
      //--styles.scss
      const componentScssFilePath = componentFolder + '/' + this.answers.componentName + '/styles.scss';
      this.fs.copyTpl(
        this.templatePath('styles.scss'), //within app/templates folder
        this.destinationPath(componentScssFilePath),
        //this.destinationPath('public/' + componentScssFilePath),
        this.answers
      );
    }

    if (this.answers.confirmEverythingOK && this.answers.enableStorybook) {
      //Component.stories.jsx
      const componentStorybookFilePath = 'stories/' + this.answers.componentName + '.stories.js';
      this.fs.copyTpl(
        this.templatePath('storybook.js'), //within app/templates folder
        this.destinationPath(componentStorybookFilePath),
        //this.destinationPath('public/' + componentStorybookFilePath),
        this.answers
      );
    }

    //TODO
    // UPDATE HOW WE CHOOSE THE PATH - SHOULD WE ALLOW THE USER TO SPECIFY IN A PROMPT
    //HOW TO HANDLE PROPS, PROPTYPES AND DEFAULT PROPS
    //CHECK IF WE INSTALLED THE MODULES - currently the modules are simple - lodash, react, etc
    //SETUP BETTER WAY TO  MANAGE TEMPLATE AND DESTINATIONPATH
    }
  }
};
