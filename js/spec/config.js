require.config({
  paths: {
    jquery: 'libs/jquery',
    jqueryNumeric: 'libs/jquery.numeric',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    dualstorage: 'libs/backbone.dualstorage',
    text: 'libs/text',
    'jasmine': 'libs/jasmine',
    'jasmine-html': 'libs/jasmine-html',
    'jasmine-boot': 'libs/jasmine-boot',
    'jasmine-jquery': 'libs/jasmine-jquery'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    dualstorage: {
      deps: ['underscore', 'backbone'],
      exports: 'Backbone.DualStorage'
    },

    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    },
    'jasmine-jquery': {
      deps : ['jasmine', 'jasmine-html', 'jquery']
    }
  }
});
