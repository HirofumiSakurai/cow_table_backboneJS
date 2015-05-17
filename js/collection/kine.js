define([
    'underscore', 
    'backbone', 
    'models/cow'
], function(_, Backbone, Cow){
    var KineCollection = Backbone.Collection.extend({

	model: Cow,

	url: "/rails/kine.json",

	fetch: function(options) {
	    if( typeof options !== "undefined" ){
		options.url =  this.url + "?search_owner=" + options.owner_id
		                        + "&redirect=sql2";
	    } else {
		options = {url: this.url + "?search_owner=&redirect=sql2"};
	    }
	    Backbone.Collection.prototype.fetch.call(this, options);
	}
    });

    return KineCollection;
});
