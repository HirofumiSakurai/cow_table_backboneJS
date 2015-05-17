define([
    'underscore',
    'backbone',
    'models/aiLog'
], function(_, Backbone, aiLog) {
    var AiLogsCollection = Backbone.Collection.extend({
	
	model: aiLog,

	url: "/rails/ai_logs/",

	fetch: function(options) {
	    options.url =  this.url + "?search_owner=" + options.owner_id
	                            + "&redirect=sql";
	    Backbone.Collection.prototype.fetch.call(this, options);
	},

    });
    return AiLogsCollection;
});
