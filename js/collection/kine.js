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
	fetch2: function(options) {
	    var urlop = {
		url: this.url + "?search_owner=" + options.owner_id
		    + "&redirect=sql2",
		// silent: true
	    };
	    options = ( typeof optoins === 'undefined')?
		urlop: _.extend(options, urlop);
	    this.fetch(_.extend(options, urlop));
	}
    });

    return KineCollection;
});
