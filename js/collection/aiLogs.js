define([
    'underscore',
    'backbone',
    'dualstorage',
    'models/aiLog'
], function(_, Backbone, DualStorage, aiLog) {
    var AiLogsCollection = Backbone.Collection.extend({

	model: aiLog,

	url: "/ai_logs/",

  // localStorage: new Backbone.LocalStorage("aiLogCollection"),

  init: function() {
    document.body.addEventListener("online", this.syncDirtyAndDestroyed, false);
  },

	fetch: function(options) {
	    var server = this.server || "";
	    options = options || {owner_id: ""};
	    options.url =  server + this.url
	                            + "?search_owner=" + options.owner_id
	                            + "&redirect=sql";
      // options.ajaxSync = true;   // used for localstorage
      this.syncDirtyAndDestroyed();
	    Backbone.Collection.prototype.fetch.call(this, options);
	},

    });
    return AiLogsCollection;
});
