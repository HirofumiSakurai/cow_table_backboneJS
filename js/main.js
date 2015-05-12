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
    [ 'backbone', 'views/kine', 'collection/kine', 'js/routers/router.js' ],
    function(Backbone, KineView, KineCollection, KineRouter){
	var kine_collection  = new KineCollection();
	var myRouter = new KineRouter({collection: kine_collection});
	myRouter.collection = kine_collection;
	Backbone.history.start();

	//var app_view = new KineView({collection: kine_collection});
    }
);
