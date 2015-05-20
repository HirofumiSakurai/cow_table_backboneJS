define([
    'underscore',
    'backbone',
    'models/aiLog'
], function(_, Backbone, aiLog) {
    var AiLogsCollection = Backbone.Collection.extend({
	
	model: aiLog,

	url: "/ai_logs/",

	fetch: function(options) {
	    var server = this.server || "";
	    options = options || {owner_id: ""};
	    options.url =  server + this.url
	                            + "?search_owner=" + options.owner_id
	                            + "&redirect=sql";
	    Backbone.Collection.prototype.fetch.call(this, options);
	},

    });
    return AiLogsCollection;
});
