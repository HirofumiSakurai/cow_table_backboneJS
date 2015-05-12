define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/kine',
    'views/cow',
//    'views/log',
    'collection/kine'
], function($, _, Backbone, KineView, CowView, /* LogView,*/ Kine){
      var KineRouter = Backbone.Router.extend({
	  routes: {
	      "" : "showKineView",
	      ":id" : "showCowView",
	      //"log/create/:id" : "showLogView"
	  },

	  showKineView: function() { //trigger kine_view to render
	      if ( ! this.kine_view ) {
		  this.kine_view = new KineView({collection: this.collection});
	      } else {
		  this.kine_view.render();
	      }
	  },

	  showCowView: function(id){
	      var cow = this.collection.findWhere({ear_num: parseInt(id)});
	      if( cow ){
		  var cow_view = new CowView({
		      model: cow.attributes
		  });
	      }
	  },

	  // showLogView: function(id){
	  //     var log_view = new LogView(id);
	  // }
      });

    return KineRouter;
});
	 
