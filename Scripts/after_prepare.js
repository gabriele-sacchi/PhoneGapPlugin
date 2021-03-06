#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');
var utilities = require("./lib/utilities");

var config = fs.readFileSync('config.xml').toString();
var name = utilities.getValue(config, 'name');

var ANDROID_DIR = 'platforms/android';
var IOS_DIR = 'platforms/ios';

var PLATFORM = {
  ANDROID: {
    dest: [
      ANDROID_DIR + '/google-services.json',
      ANDROID_DIR + '/app/google-services.json'
    ],
    src: [
      'google-services.json',
      ANDROID_DIR + '/assets/www/google-services.json',
      'www/google-services.json',
      ANDROID_DIR + '/app/src/main/google-services.json'
    ],
  }
};

module.exports = function (context) {
  //get platform from the context supplied by cordova
  var platforms = context.opts.platforms;
  // Copy key files to their platform specific folders
  if (platforms.indexOf('ios') !== -1 && utilities.directoryExists(IOS_DIR)) {
    console.log('NOT preparing Firebase on iOS since it does not use it -- right???');
    // utilities.copyKey(PLATFORM.IOS);
  }
  if (platforms.indexOf('android') !== -1 && utilities.directoryExists(ANDROID_DIR)) {
    console.log('Preparing Firebase on Android -- Oscar rocks!! 😎');
    utilities.copyKey(PLATFORM.ANDROID);
  }
};
