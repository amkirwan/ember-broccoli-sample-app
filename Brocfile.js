var uglifyJavaScript = require('broccoli-uglify-js');
var compileES6 = require('broccoli-es6-concatenator');
var templateCompiler = require('broccoli-template');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var findBowerTrees = require('broccoli-bower');

function preprocess(tree) {
  tree = templateCompiler(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  });
  return tree;
}

var app = 'app'
app = pickFiles(app, {
  srcDir: '/',
  destDir: 'appkit'
})

app = preprocess(app);

var vendor = 'vendor';

var sourceTrees = [app, vendor];

sourceTrees = sourceTrees.concat(findBowerTrees());
var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true })

var appJs = compileES6(appAndDependencies, {
  loaderFile: 'loader.js',
  ignoredModules: [
    'ember/resolver'
  ],
  inputFiles: [
    'appkit/**/*.js'
  ],
  legacyFilesToAppend: [
    'jquery.js',
    'handlebars.js',
    'ember.js',
    'ember-data.js',
    'ember-resolver.js'
  ],
  wrapInEval: true,
  outputFile: '/assets/app.js'
});

var publicFiles = 'public'

module.exports = mergeTrees([appJs, publicFiles])
