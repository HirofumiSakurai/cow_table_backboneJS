require.config({
  paths: {
    jquery: 'libs/jquery',
    jqueryNumeric: 'libs/jquery.numeric',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    dualstorage: 'libs/backbone.dualstorage'
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
    }
  }
});

require(
    [ 'backbone', 'routers/router', 'dualstorage' ],
    function(Backbone, KineRouter){
	    var myRouter = new KineRouter();
	    Backbone.history.start();
    }
);
