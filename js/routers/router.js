define([
    'jquery', 
    'underscore', 
    'backbone',
    'views/kine',
    'views/cow',
    'views/aiLog',
    'collection/kine',
    'collection/aiLogs',
    'collection/daughters',
    'models/cow',
    'models/aiLog',
    'models/daughter'
], function($, _, Backbone,
	    KineView, CowView, AiLogView,
	    Kine, AiLogs, Daughters, Cow, AiLogModel, Daughter){
      var KineRouter = Backbone.Router.extend({
	  routes: {
	      ""                           : "showLoginView",
	      "user/"                      : "showKineView",
	      "user/cowCreate/"            : "createCowView",
	      "user/cowRead/:id"           : "showCowView",
	      "user/cowUpdate/:id"         : "updateCowView",
	      "user/cowDelete/:id"         : "destroyCowView",
	      "user/cow/logCreate/:cow_id" : "createLogView",
	      "user/cow/logRead/:id"      : "readLogView",
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
		      "next": "user/",
		      "cancel": "user/",
		  },
		  "user/cowRead/": {
		      "back":      "<==",
		      "update":    "user/cowUpdate/",
		      "delete":    "user/cowDelete/",
		      "logCreate": "user/cow/logCreate/",
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
		      cancel: "user/cow/logRead/",
		  },
		  "user/cow/logDelete/": {
		      next: "user/cowRead/",
		      cancel: "user/cow/logRead/",
		  },
	      };
	      return nr[(r === "")?"root": r];
	  },

	  initialize: function () {
	      this.kineCollection = undefined;
	      this.aiLogCollection = undefined;
	  },

	  prepare: function( action, path, options ){
	      // call this func. on top of every action. 
	      this.last_action = this.current_action;
	      this.current_action = action;
	      this.current_path = path;
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
	      view.owner_id = this.owner_id;
	      view.router = this;
	      view.route = this.next_route_search(this.current_path);
	      view.navigate = function(tag, opt ){
		  opt = opt || "";
		  var r = this.route[tag];
		  if( typeof r == "undefined")
		      console.log(
			  "view.navigate : No route for the tag : "+tag);
		  if( r === "<==" ){  // imply to history back.
		      history.back();
		  } else {
		      this.router.navigate(this.route[tag]+opt,
					   {trigger: true});
		  }
	      }
	      view.kineCollection = this.kineCollection;
	      view.logCollection = this.logCollection;
	      view.daughtersCollection = this.daughtersCollection;
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
	      } else {
		  this.showKineViewCallBack();
	      }
	  },

	  showKineViewCallBack: function() {
	      this.clearView();
	      var view = new KineView({
		      collection: this.kineCollection,
		      id : this.owner_id,
	      });
	      this.postaction(view);
	  },

	  createCowView: function(){
	      this.prepare("createCow", "user/cowCreate/");
	      var cow = new Cow();
	      cow.owner_id = this.owner_id;
	      var view = new CowView({ model: cow });
	      view.method = "create";
	      view.id = this.owner_id; // for backward compatibility.
	      this.postaction(view);
	  },

	  showCowView: function(cow_id){
	      this.prepare("readCow", "user/cowRead/");
	      var cow = this.kineCollection.findWhere({
		  id: parseInt(cow_id),
	      });
	      if( ! cow ){ // never happen, I hope.
		  this.navigate("", {triger: true});
	      } else {
		  var view = new CowView({ model: cow });
		  view.method=  "read";
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
	      this.prepare("createLog", "user/cow/logCreate/");
	      var aiLog = new AiLogModel();
	      aiLog.set({cow_no: cow_id});
	      var view = new AiLogView({model: aiLog});
	      view.method = "create";
	      view.owner_id = this.owner_id;
	      this.postaction(view);
	  },
	  
	  readLogView: function(id){
	      this.prepare("readLog", "user/cow/logRead/");
	      var aiLog = this.logCollection.findWhere({id: parseInt(id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "read";
	      view.owner_id = this.owner_id;
	      this.postaction(view);
	  },
	  
	  updateLogView: function(id){
	      this.prepare("updateLog", "user/cow/logUpdate/");
	      var aiLog = this.logCollection.findWhere({id: parseInt(id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "update";
	      view.owner_id = this.owner_id;
	      this.postaction(view);
	  },

	  deleteLogView: function(id){
	      this.prepare("deleteLog", "user/cow/logDelete/");
	      var aiLog = this.logCollection.findWhere({id: parseInt(id)});
	      if( ! aiLog ){ // never happen, unless you put id on address.
		  Backbone.history(this.next_route.back);
		  return;
	      }
	      var view = new AiLogView({model: aiLog});
	      view.method = "delete";
	      view.owner_id = this.owner_id;
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
	      this.logCollection.comparator = function(a, b) {
		  return (a.get("date")  > b.get("date"))? -1: 1;
	      };
	      this.listenToOnce(this.logCollection, "sync",
				this.loadCollectionsStep3);
	      this.logCollection.fetch({owner_id: this.owner_id});
	  },
	  
	  loadCollectionsStep3: function(){
	      this.daughtersCollection = new Daughters();
	      this.listenToOnce(this.daughtersCollection, "sync",
				this.loadCollectionsCallback);
	      this.daughtersCollection.fetch({owner_id: this.owner_id});
	  },
      });

    return KineRouter;
});
	 
