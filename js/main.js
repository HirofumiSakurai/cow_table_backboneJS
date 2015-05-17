require.config({
  paths: {
    jquery: 'libs/jquery',
    jqueryNumeric: 'libs/jquery.numeric',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }

});

require(
    [ 'backbone', 'js/routers/router.js' ],
    function(Backbone, KineRouter){
	var myRouter = new KineRouter();
	Backbone.history.start();
    }
);
