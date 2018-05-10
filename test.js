/* global it */

'use strict'

var fs = require('fs')
var di = require('di')
var framework = require('./')

it('should inject the chrome flavor by default', function () {
  var config = { 'config': [ 'value', { files: [] } ] }
  var injector = new di.Injector([ config, framework ])

  injector.get('framework:sinon-chrome')

  injector.get('config.files')
    .map(file => file.pattern)
    .forEach(path => {
      fs.accessSync(path);
      if (!path.includes('sinon-chrome.min.js')) {
        throw 'Expected chrome API flavor.';
      }
    })
});


it('should inject the webextension flavor when requested', function () {
  var config
      = { 'config': [ 'value', { files: [], sinonChrome: 'webextension' } ] };
  var injector = new di.Injector([ config, framework ])

  injector.get('framework:sinon-chrome')

  injector.get('config.files')
    .map(file => file.pattern)
    .forEach(path => {
      fs.accessSync(path);
      if (!path.includes('webextensions.min.js')) {
        throw 'Expected chrome API flavor.';
      }
    })
});
