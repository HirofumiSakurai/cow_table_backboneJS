define([
    'underscore', 
    'backbone', 
    'models/cow'
], function(_, Backbone, Cow){

    var KineCollection = Backbone.Collection.extend({

	model: Cow,
	//url: "/kine/kine.json",
	url: "/rails/kine.json",
	// emulateHTTP: true,
	// emulateJSON: true
	//owner_id: 5,
	fetch: function(options) {
	    var c = new Backbone.Collection();
	    if( options.owner_id !== ''){
		options = options ? _.clone(options) : {};
		var urlop = {
		    url: this.url + "?search_owner=" + options.owner_id
		                  + "&redirect=sql2",
		    // silent: true
		};
		var c = new Backbone.Collection();
		c.fetch.call(this, _.extend(options, urlop));
	    } else {
		c.fetch(options);
	    }
	}
    });

    return KineCollection;
});
