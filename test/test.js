'use strict';
var path = require('path'),
    helpers = require('yeoman-generator').test,
    assert = require('yeoman-generator').assert;

describe('Nw.js generator', function () {
    // not testing the actual run of generators yet
    it('the generator can be required without throwing', function () {
        this.app = require('../app');
    });

    describe('run test', function () {

        var expectedContent = [
            ['package.json', /"version": "0.0.0"/]
        ];
        var expected = [
            '.gitignore',
            'gulpfile.js',
            'package.json',
            'README.md',
            'favicon.ico',
            'app/favicon.png',
            'app/index.html',
            'app/vendor/js/jquery.min.js',
            'app/vendor/js/app.js',
            'app/vendor/js/material.min.js',
            'app/vendor/js/bootstrap.min.js',
            'app/vendor/js/right-click.js',
            'app/vendor/css/main.css',
            'app/vendor/css/bootstrap.min.css',
            'app/vendor/css/material-wfont.min.css',
            'app/vendor/css/material.min.css',
            'app/vendor/css/ripples.min.css',
            'app/vendor/fonts/Material-Design-Icons.eot',
            'app/vendor/fonts/Material-Design-Icons.svg',
            'app/vendor/fonts/Material-Design-Icons.ttf',
            'app/vendor/fonts/Material-Design-Icons.woff'
        ];

        var options = {
            'skip-install-message': true,
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-message': true
        };

        var runGen;

        beforeEach(function () {
            runGen = helpers
                .run(path.join(__dirname, '../app'))
                .inDir(path.join(__dirname, '.tmp'))
                .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
        });

         it('creates expected files', function (done) {
            runGen.withOptions(options).withPrompt({
             title: 'Test Nwjs'
            }).on('end', function () {

                assert.file(expected);
                assert.fileContent(expectedContent);
                assert.noFileContent([
                    ['app/index.html', /angular/]
                ]);
                done();
            });
        });

        it('creates expected files with angular', function (done) {
            runGen.withOptions(options).withPrompt({
             title: 'Test Nwjs',
             angular: true
            }).on('end', function () {

                assert.file([].concat(
                    expected,
                    [
                        'app/vendor/js/angular.min.js',
                        'app/vendor/js/angular-routes.min.js',
                        'app/vendor/js/arrive.js'
                    ]
                ));
                assert.fileContent([].concat(
                    expectedContent,
                    [
                        ['app/index.html', /angular/],
                        ['app/index.html', /ng-app/],
                        ['app/vendor/js/app.js', /angular/]
                    ]
                ));

                done();
            });
        });

        it('creates expected files with snackbar', function (done) {
            runGen.withOptions(options).withPrompt({
             title: 'Test Nwjs',
             snackbar: true
            }).on('end', function () {

                assert.file([].concat(
                    expected,
                    [
                        'app/vendor/css/snackbar.min.css',
                        'app/vendor/js/snackbar.min.js'
                    ]
                ));
                assert.fileContent([].concat(
                    expectedContent,
                    [
                        ['app/index.html', /snackbar.min.css/],
                        ['app/index.html', /snackbar.min.js/]
                    ]
                ));

                done();
            });
        });
    });
});
