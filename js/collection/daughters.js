define([
    'underscore',
    'backbone',
    'models/daughter'
], function(_, Backbone, Daughter){
    // Daughters は、Rails を通して Kine の daughters を一括してダウンロード
    // するためのニセのコレクションです。daughters のようなデータは PostgreSQL
    // で作ると非常に効率が良いため、このようなインプリメントにしてあります。

    var DaughtersCollection = Backbone.Collection.extend({

	model: Daughter,

	url: "/daughters.json",

	fetch: function(options) {
	    var server = this.server || "";
	    if( typeof options === "undefined" || options.owner_id === "" )
		return;
	    options.url =  server + this.url
                      + "?redirect=on&search_owner="
                      + options.owner_id;
	    Backbone.Collection.prototype.fetch.call(this, options);
	}
    });

    return DaughtersCollection;
});
