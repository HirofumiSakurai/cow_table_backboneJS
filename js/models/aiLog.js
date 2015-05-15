define(['underscore', 'backbone'], function(_, Backbone) {
  var AiLogModel = Backbone.Model.extend({

      defaults: {
	  id: '',
	  cow_no: -1,
          date: '',
          state: ''
      },

      root: "/rails/ai_logs/",

      initialize: function() {
	  this.url = this.root;
      },

      fetch: function(options){
	  this.url = this.root + this.attributes.id;
	  Backbone.Model.prototype.fetch.call(this, options);
      },
      
      save: function(options){
	  if( this.attributes.id )
	      this.url = this.root + this.attributes.id;
	  Backbone.Model.prototype.save.call(this, options);
      },
      
      create: function(){
	  this.attributes.id = undefined;
	  this.url = this.root;
	  this.save();
      }
  });
  return AiLogModel;
});
