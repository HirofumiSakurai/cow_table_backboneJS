define(['underscore', 'backbone'], function(_, Backbone) {
  var AiLogModel = Backbone.Model.extend({

      defaults: {
	  id: '',
	  cow_no: -1,
          date: '',
          state: '',
	  owner_id: -1
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
	  if( this.attributes.id == "" )
	      this.attributes.id = undefined;
	  if( this.attributes.id )
	      this.url = this.root + this.attributes.id;
	  Backbone.Model.prototype.save.call(this, options);
      },
      
      destroy: function(options){
	  if( typeof this.attributes.id == "undefined"
	      || this.attributes.id == "" ){
	      console.log("aiLog.model.destory(): id is null!!");
	      return;
	  }
	  this.url = this.root + this.attributes.id;
	  Backbone.Model.prototype.destroy.call(this, options);
      },
      
      create: function(){
	  this.attributes.id = undefined;
	  this.url = this.root;
	  this.save();
      }
  });
  return AiLogModel;
});
