define([
    'underscore',
    'backbone',
    'dualstorage',
    'models/cow'
], function(_, Backbone, DualStorage, Cow){
    var KineCollection = Backbone.Collection.extend({

	model: Cow,

	url: "/kine.json",

  init: function() {
    document.body.addEventListener("online", this.syncDirtyAndDestroyed, false);
  },

	fetch: function(options) {
	    var server = this.server || "";
	    options = options || {owner_id: ""};
	    options.url =  server + this.url
		                    + "?search_owner="
                        + options.owner_id
		                    + "&redirect=sql";
      this.syncDirtyAndDestroyed();
	    Backbone.Collection.prototype.fetch.call(this, options);
	}
    });

    return KineCollection;
});
