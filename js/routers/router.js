define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/kine',
    'views/cow',
    'views/aiLog',
    'collection/kine',
    'collection/aiLogs',
    'models/cow',
    'models/aiLog'
], function($, _, Backbone,
	    KineView, CowView, AiLogView,
	    Kine, AiLogs, Cow, AiLogModel){
      var KineRouter = Backbone.Router.extend({
	  routes: {
	      ""                           : "showLoginView",
	      "user/"                      : "showKineView",
	      "user/cowCreate/"            : "createCowView",
	      "user/cowRead/:id"           : "showCowView",
	      "user/cowUpdate/:id"         : "updateCowView",
	      "user/cowDelete/:id"         : "destroyCowView",
	      "user/cow/logCreate/:cow_id" : "createLogView",
	      "user/cow/logRread/:id"      : "readLogView",
	      "user/cow/logUpdate/:id"     : "updateLogView",
	      "user/cow/logDelete/:id"     : "deleteLogView",
	  },

	  next_route_search: function(r){
	      var nr = {
		  "root": {next: "user/"},
		  "user/": {
		      "create": "user/cowCreate/",
		      "cow":    "user/cowRead/",
		      "back":   "",
		  },
		  "user/cowCreate/": {
		      "next": "user/cowRead/",
		      "cancel": "user/",
		  },
		  "user/cowRead/": {
		      "back":      "user/",
		      "update":    "user/cowUpdate/",
		      "delete":    "user/cowDelete/",
		      "LogCreate": "user/cow/logCreate/",
		      "logRead":   "user/cow/logRead/",
		  },
		  "user/cowUpdate/": {
		      "next":      "user/cowRead/",
		      "cancel":    "user/cowRead/",
		  },
		  "user/cowDelete/": {
		      "next":      "user/",
		      "cancel":    "user/cowRead/",
		  },
		  "user/cow/logCreate/": {
		      next: "user/cowRead/",
		      back: "user/cowRead/",
		  },
		  "user/cow/logRead/": {
		      update: "user/cow/logUpdate/",
		      delete: "user/cow/logDelete/",
		      back: "user/cowRead/",
		  },
		  "user/cow/logUpdate/": {
		      next: "user/cowRead/",
		      cancel: "user/cow/logRead",
		  },
		  "user/cow/logDelete/": {
		      next: "user/cowRead/",
		      cancel: "user/cow/logRead/",
		  },
	      };
	      return nr[(r === "")?"root": r];
	  },

	  prepare: function( action, path, options ){
	      // call this func. on top of every action. 
	      this.last_action = this.current_action;
	      this.current_action = action;
	      this.next_route = this.next_route_search(path);
	      if(typeof options == "undefined" || ! options.manual){
		  // turn off auto clear the last view;
		  this.clearView();
	      }
	  },

	  clearView: function(){
	      if( typeof this.current_view !== "undefined"){
		  this.current_view.remove();
		  $('body').append('<div id="main"></div>');
	      }
	      this.current_view = undefined;
	  },


	  postaction: function(view){
	      if( typeof current_view !== "undefined"){
		  console.log("error: you forgot to clear view manually!");
	      }
	      this.current_view = view;
	      view.route = this.next_route;   // to be replace by navigate func.
//	      $('#main').html(view.render().el);
	      $('#main').append(view.render().el);
	  },

	  showLoginView: function() {
	      this.prepare("login", "");
	      var view = new KineView({
		  collection: undefined,
		  id : undefined
	      });
	      view.method = "login";
	      this.postaction(view);
	  },

	  showKineView: function() {
	      this.prepare("kine", "user/", {manual: true});
	      if( this.last_action === "login" ){
		  this.owner_id = this.current_view.last_input;
		  this.loadCollections(this.showKineViewCallBack);
	      }
	  },

	  showKineViewCallBack: function() {
	      this.clearView();
	      var view = new KineView({
		      collection: this.kineCollection,
		      id : this.owner_id,
	      });
	      view.aiLogCollection = this.aiLogCollection;
	      this.postaction(view);
	  },

	  createCowView: function(owner_id){
	      this.prepare("createCow", "user/cowCreate/");
	      var cow = new Cow();
	      model.owner_id = owner_id;
	      var view = new CowView({ model: cow });
	      view.method = "create";
	      view.id = owner_id; // for backward compatibility.
	      this.postaction(view);
	  },

	  showCowView: function(cow_id){
	      this.prepare("readCow", "user/cowRead/");
	      var cow = this.kineCollection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){ // never happen, I hope.
		  Backbone.history(this.next_route.back);
	      } else {
		  var view = new CowView({ model: cow });
		  view.method=  "read";
		  view.logCollection = this.logCollection;
		  this.postaction(view);
	      }
	  },

	  updateCowView: function(cow_id){
	      this.prepare("updateCow", "user/cowUpdate/");
	      var cow = this.kineCollection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){ // never happen, I hope.
		  Backbone.history(this.next_route.back);
	      } else {
		  var view = new CowView({ model: cow });
		  view.method =  "update";
		  this.postaction(view);
	      }
	  },

	  destroyCowView: function(cow_id){
	      this.prepare("destroyCow", "user/cowDestroy/");
	      var cow = this.kineCollection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){ // never happen, I hope.
		  Backbone.history(this.next_route.back);
	      } else {
		  var view = new CowView({ model: cow });
		  view.method = "destroy";
		  this.postaction(view);
	      }
	  },

	  createLogView: function(cow_id){
	      this.prepare("createLog", "user/cow/logCreate");
	      var aiLog = new AiLogModel();
	      aiLog.set({cow_no: cow_id});
	      var view = new AiLogView({model: aiLog});
	      view.method = "create";
	      this.postaction(view);
	  },
	  
	  readLogView: function(id){
	      this.prepare("readLog", "user/cow/logRead");
	      var aiLog = this.logCollection.findWhere({id: parseInt(cow_id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "read";
	      this.postaction(view);
	  },
	  
	  updateLogView: function(id){
	      this.prepare("updateLog", "user/cow/logUpdate");
	      var aiLog = this.logCollection.findWhere({id: parseInt(cow_id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "update";
	      this.postaction(view);
	  },

	  deleteLogView: function(id){
	      this.prepare("deleteLog", "user/cow/logDelete");
	      var aiLog = this.logCollection.findWhere({id: parseInt(cow_id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "delete";
	      this.postaction(view);
	  },

	  loadCollections: function(callback){
	      this.kineCollection = new Kine();
	      this.kineCollection.comparator = function(model) {
		  return model.get("id");
	      };
	      this.listenToOnce(this.kineCollection, "sync",
				this.loadCollectionsStep2);
	      this.loadCollectionsCallback = callback;
	      this.kineCollection.fetch({owner_id: this.owner_id});
	  },
	  
	  loadCollectionsStep2: function(){
	      this.logCollection = new AiLogs();
	      this.listenToOnce(this.logCollection, "sync",
				this.loadCollectionsCallback);
	      this.logCollection.fetch({owner_id: this.owner_id});
	  },
	  
      });

    return KineRouter;
});
	 
