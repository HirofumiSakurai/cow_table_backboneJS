define([
    'underscore', 
    'backbone', 
    'models/cow'
], function(_, Backbone, Cow){
    var KineCollection = Backbone.Collection.extend({

	model: Cow,

	url: "/kine.json",

	fetch: function(options) {
	    var server = this.server || "";
	    options = options || {owner_id: ""};
	    options.url =  server + this.url
		                    + "?search_owner=" + options.owner_id
		                    + "&redirect=sql";
	    Backbone.Collection.prototype.fetch.call(this, options);
	}
    });

    return KineCollection;
});
