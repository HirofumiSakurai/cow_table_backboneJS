define(['underscore', 'backbone'], function(_, Backbone) {
  var DaughterModel = Backbone.Model.extend({

      defaults: {
	  id: '',
	  name:   '',
      },

      root: "/daughters/",

      initialize: function() {
	  this.url = this.root;
      },

      fetch: function(options){
	  this.url = this.root + this.attributes.id + ".json"
	                       + "?redirect=on";
	  Backbone.Model.prototype.fetch.call(this, options);
      },
  });
  return DaughterModel;
});
