'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdir = require('mkdirp');
var _ = require('underscore.string');


var NodeServiceGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },
  askFor: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous nw.js generator!'));
    var prompts = [
      {
        type: 'string',
        name: 'title',
        message: 'What is the title of your application?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'angular',
        message: 'Would you like Angular ?',
        default: false
      },
      {
        type: 'string',
        name: 'name',
        message: 'What is your name?',
        default: 'C\xE9dric'
      },
      {
        type: 'string',
        name: 'github',
        message: 'What is your github?',
        default: 'cedced19'
      },
      {
        type: 'string',
        name: 'email',
        message: 'What is your email?',
        default: 'cedced19@gmail.com'
      }
    ];
    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.description = props.description;
      this.name = props.name;
      this.github = props.github;
      this.email = props.email;
      this.angular = props.angular;
      done();
    }.bind(this));
  },

  app: function () {
    mkdir('app/vendor/js');
    mkdir('app/vendor/css');
    mkdir('app/vendor/fonts');

    this.template('app/index.html', 'app/index.html');
    this.template('_package.json', 'package.json');
    this.template('app/_package.json', 'app/package.json');
    this.template('gulpfile.js', 'gulpfile.js');
    this.template('README.md', 'README.md');

    this.template('app/vendor/js/app.js', 'app/vendor/js/app.js');
    this.copy('app/vendor/js/jquery.min.js', 'app/vendor/js/jquery.min.js');
    this.copy('app/vendor/js/material.min.js', 'app/vendor/js/material.min.js');
    this.copy('app/vendor/js/bootstrap.min.js', 'app/vendor/js/bootstrap.min.js');
    this.copy('app/vendor/js/right-click.js', 'app/vendor/js/right-click.js');
    this.copy('app/vendor/js/ripples.min.js', 'app/vendor/js/ripples.min.js');

    this.copy('app/vendor/css/main.css', 'app/vendor/css/main.css');
    this.copy('app/vendor/css/bootstrap.min.css', 'app/vendor/css/bootstrap.min.css');
    this.copy('app/vendor/css/material-wfont.min.css', 'app/vendor/css/material-wfont.min.css');
    this.copy('app/vendor/css/material.min.css', 'app/vendor/css/material.min.css');
    this.copy('app/vendor/css/ripples.min.css', 'app/vendor/css/ripples.min.css');

    this.copy('app/vendor/fonts/Material-Design-Icons.eot', 'app/vendor/fonts/Material-Design-Icons.eot');
    this.copy('app/vendor/fonts/Material-Design-Icons.svg', 'app/vendor/fonts/Material-Design-Icons.svg');
    this.copy('app/vendor/fonts/Material-Design-Icons.ttf', 'app/vendor/fonts/Material-Design-Icons.ttf');
    this.copy('app/vendor/fonts/Material-Design-Icons.woff', 'app/vendor/fonts/Material-Design-Icons.woff');

    this.copy('favicon.ico', 'favicon.ico');
    this.copy('app/favicon.png', 'app/favicon.png');
    this.copy('gitignore', '.gitignore');

    if(this.angular){
      mkdir('app/vendor/views');

      this.template('app/vendor/views/index.html', 'app/vendor/views/index.html');
      this.copy('app/vendor/js/arrive.js', 'app/vendor/js/arrive.js');
      this.copy('app/vendor/js/angular.min.js', 'app/vendor/js/angular.min.js');
      this.copy('app/vendor/js/angular-routes.min.js', 'app/vendor/js/angular-routes.min.js');
    }
  }
});


module.exports = NodeServiceGenerator;
