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

      initialize: function() {
      }
  });
  return CowModel;
});
