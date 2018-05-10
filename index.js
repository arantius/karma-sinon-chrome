'use strict'

let path = require('path');

let pattern = function (file) {
  return { pattern: file, included: true, served: true, watched: false };
}

let framework = function (files, flavor) {
  let jsFileName = flavor == 'webextension'
      ? 'sinon-chrome-webextensions.min.js'
      : 'sinon-chrome.min.js';
  let sinonChromePath = path.resolve(
      require.resolve('sinon-chrome'), '../bundle', jsFileName);
  files.unshift(pattern(sinonChromePath))
}

framework.$inject = ['config.files', 'config.sinonChrome']

module.exports = {
  'framework:sinon-chrome': ['factory', framework]
}
