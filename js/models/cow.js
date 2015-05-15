define(['underscore', 'backbone'], function(_, Backbone) {
  var CowModel = Backbone.Model.extend({

      defaults: {
	  id: '',
	  ear_num: '',
	  name:   '',
	  birth: '',
	  sex: '',
	  owner_id: 0,
	  parent: 0,
	  t1:'',t2:'',t3:'',t4:'',t5:'',t6:'',t7:'',t8:'',t9:'',
	  t10:'',t11:'',t12:'',t13:'',t14:'',t15:'',t16:'',t17:'',t18:'',t19:'',
	  t20:'',t21:'',t22:'',t23:'',t24:'',t25:'',t26:'',t27:'',t28:'',t29:'',
	  t30:'',t31:'',t32:'',t33:'',t34:'',t35:'',t36:'',t37:'',t38:'',t39:'',
	  t40:'',t41:'',t42:'',t43:'',t44:'',t45:'',t46:'',t47:'',t48:'',t49:'',
	  t50:'', created_at:'',updated_at:''
      },

      root: "/rails/kine/",

      initialize: function() {
	  this.url = this.root;
      },

      fetchById: function(options) {
      	  var urlop = {
      	      url: this.url + this.attributes.id + ".json?redirect=sql2"
      	  };
	  options = ( typeof optoins === 'undefined')?
	      urlop: _.extend(options, urlop);
      	  this.fetch(options);
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
  return CowModel;
});
