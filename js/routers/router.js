define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/kine',
    'views/cow',
    'views/aiLog',
    'collection/kine',
    'models/cow',
    'models/aiLog'
], function($, _, Backbone, KineView, CowView, AiLogView, Kine, Cow, AiLogModel){
      var KineRouter = Backbone.Router.extend({
	  routes: {
	      ""             : "showKineView",
	      "cowC/"        : "createCowView",
	      "cowR/:id"     : "showCowView",
	      ":id"          : "showCowView",
	      "cowU/:id"     : "updateCowView",
	      "cowD/:id"     : "destroyCowView",
	      "logC/:cow_id" : "createLogView",
	      "logR/:id"     : "readLogView",
	      "logU/:id"     : "updateLogView",
	      "logD/:id"     : "deleteLogView",
	  },

	  newKineView: function(attr){
	      if( this.kineView )
		  this.kineView.remove();
	      $('html').append('<div id="root"></div>');
	      this.kineView = new KineView(attr);
	      return this.kineView;
	  },

	  showKineView: function() { //trigger kine_view to render
	      if ( ! this.kine_view ) {
		  this.kine_view = this.newKineView({
		      collection: this.collection,
		      router: this
		  });
		  this.kine_view.router = this;
	      } else {
		  this.kine_view.render();
	      }
	  },

	  newCowView: function(attr){
	      if( this.cowView )
		  this.cowView.remove();
	      $('html').append('<div id="root"></div>');
	      this.cowView = new CowView(attr);
	      return this.cowView;
	  },

	  createCowView: function(){
	      var cow = new Cow();
	      cow.set({method: "create"});
	      var cow_view = this.newCowView({ model: cow });
	  },

	  showCowView: function(cow_id){
	      var cow = this.collection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){
		  cow = new Cow();
		  cow.set({fetch: "true", id: cow_id});
	      }
	      cow.set({method: "read"});
	      var cow_view = this.newCowView({ model: cow });
	  },

	  updateCowView: function(cow_id){
	      var cow = this.collection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){
		  cow = new Cow();
		  cow.set({fetch: "true", id: cow_id});
	      }
	      cow.set({method: "update"});
	      var cow_view = this.newCowView({ model: cow });
	  },

	  destroyCowView: function(cow_id){
	      var cow = this.collection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){
		  cow = new Cow();
		  cow.set({fetch: "true", id: cow_id});
	      }
	      cow.set({method: "destroy"});
	      var cow_view = this.newCowView({ model: cow });
	  },

	  newAiLogView: function(attr){
	      if( this.aiLogView )
		  this.aiLogView.remove();
	      $('html').append('<div id="root"></div>');
	      this.aiLogView = new AiLogView(attr);
	      return this.aiLogView;
	  },

	  createLogView: function(cow_id){
	      var aiLog = new AiLogModel();
	      aiLog.set({cow_no: cow_id});
	      aiLog.method = "create";
	      var log_view = this.newAiLogView({
		  model: aiLog
	      });
	  },
	  
	  readLogView: function(id){
	      var aiLog = new AiLogModel();
	      aiLog.set({id: id});
	      aiLog.method = "read";
	      var log_view = this.newAiLogView({
		  model: aiLog
	      });
	  },
	  
	  updateLogView: function(id){
	      var aiLog = new AiLogModel();
	      aiLog.set({id: id});
	      aiLog.method = "update";
	      var log_view = this.newAiLogView({
		  model: aiLog
	      });
	  },

	  deleteLogView: function(id){
	      var aiLog = new AiLogModel({id: id});
	      aiLog.method = "delete";
	      var log_view = this.newAiLogView({
		  model: aiLog
	      });
	  },

      });

    return KineRouter;
});
	 
