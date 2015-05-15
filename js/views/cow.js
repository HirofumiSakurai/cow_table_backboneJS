define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/cow.html',
    'text!templates/cowE.html',
    'text!templates/daughter.html',
    'models/cow',
    'models/aiLog',
    'views/ai_log_item',
    'views/aiLog'
], function($, _, Backbone, cowTemp, cowTempE, daughterTemp,
	    Cow, AiLogModel,AiLogItem, AiLog){
    var CowView = Backbone.View.extend({

	el: '#root',

	template: _.template(cowTemp),
	templateE: _.template(cowTempE),
	daughterTemplate: _.template(daughterTemp),

	events: {
	    "click #back"     : "navi2backward",
	    "click #toUpdate" : "navi2update",
	    "click #toDestroy": "navi2destroy",
	    "click #save"     : "saveModel",
	    "click #destroy"  : "destroyModel",
	    "click #cancel"   : "navi2backward",
	    "click #create-ai-log": "createAiLog"
	},

	initialize: function() {
	    this.method = this.model.attributes.method; // lost after fetch;
	    if( this.method === "create" ){
		this.render();
	    }
	    if(this.model.attributes.fetch === "true"){
		this.listenTo(this.model, 'sync', this.render2);
		this.model.fetchById();
	    } else {
		this.listenTo(this.model, 'sync', this.render);
		this.render();
	    }
	},

	render: function() {
	    this.view_list = [];
	    if( _.find(["read", "destroy"], function(e){
		return this.method === e}, this)){
		this.$el.html(this.template(this.model.attributes));
		_.each(this.model.attributes.daughters, function(d){
		    $('#daughter-list').append(this.daughterTemplate(d));
		}, this);
		_.each(this.model.attributes.ai_logs, function(a){
		    var view = new AiLogItem({
			model: a,
		    });
		    this.view_list.push(view);
		    this.$('#ai-log-list').append(view.render().el);
		}, this);
		if(this.method === "destroy"){
		    this.$('#button').append(
			'<input type="button" value="取り消し" id="cancel" />'
		       +'<input type="button" value="削除" id="destroy" />');
		} else if(this.method === "read"){
		    this.$('#button').append(
			'<input type="button" value="削除" id="toDelete" />');
		    this.$('#button').append(
			'<input type="button" value="変更" id="toUpdate" />');
		    this.$('#button').append(
			'<input type="button" value="戻る" id="cancel" />');
		}
	    } else if( _.find(["create", "update"], function(e){
		return this.method === e}, this)){
		this.$el.html(this.templateE(this.model.attributes));
		if(this.model.attributes.method === "create"){
		    this.$('#button').append(
			'<input type="button" value="取り消し" id="cancel" />'
		       +'<input type="button" value="作成" id="create" />');
		} else if(this.model.attributes.method === "update"){
		    this.$('#button').append(
			'<input type="button" value="取り消し" id="cancel" />'
		       +'<input type="button" value="変更" id="update" />');
		} 
	    }
	    return this;
	},

	render2: function(){
	    // なぜか、modelにfetchすると、model.attribute[0] に値が返される!
	    if( typeof this.model.attributes[0] !== "undefined"){
		this.model.attributes = this.model.attributes[0];
	    }
	    this.listenTo(this.model, 'sync', this.render);
	    this.render();
	},

	navi2backward: function() {
	    Backbone.history.navigate("", {trigger: true});
	},

	navi2update: function() {
	    Backbone.history.navigate(
		"cowU/"+ this.model.attributes.id,
		{trigger: true}
	    );
	},

	navi2destroy: function() {
	    Backbone.history.navigate(
		"cowD/"+ this.model.attributes.id,
		{trigger: true}
	    );
	},

	saveModel: function() {
	    this.dataBinder();
	    if( this.method === "create" )
		this.model.attributes.id = undefined;
	    this.model.save();
	    this.navi2backward();
	},

	destroyModel: function() {
	    this.model.destroy();
	    this.navi2backward();
	},

	dataBinder: function(){
	    // var id = this.model.attributes.id;
	    this.model.attributes = {
		// id:        id,
		ear_num:   this.$('#ear_num').val(),
		name:      this.$('#name').val(),
		sex:       (this.$('#sex-female').val()==="TURE")?"雌":"雄",
		birth:     this.$('#birth').val(),
		owner_id:  this.$('#owner_id').val(),
		parent:    this.$('#parent').val(),
		t1: this.$('#t1').val(),
		t2: this.$('#t2').val(),
		t3: this.$('#t3').val(),
		t4: this.$('#t4').val(),
		t5: this.$('#t5').val(),
		t6: this.$('#t6').val(),
		t7: this.$('#t7').val(),
		t8: this.$('#t8').val(),
		t9: this.$('#t9').val(),
		t10: this.$('#t10').val(),
		t11: this.$('#t11').val(),
		t12: this.$('#t12').val(),
		t13: this.$('#t13').val(),
		t14: this.$('#t14').val(),
		t15: this.$('#t15').val(),
		t16: this.$('#t16').val(),
		t17: this.$('#t17').val(),
		t18: this.$('#t18').val(),
		t19: this.$('#t19').val(),
		t20: this.$('#t20').val(),
		t21: this.$('#t21').val(),
		t22: this.$('#t22').val(),
		t23: this.$('#t23').val(),
		t24: this.$('#t24').val(),
		t25: this.$('#t25').val(),
		t26: this.$('#t26').val(),
		t27: this.$('#t27').val(),
		t28: this.$('#t28').val(),
		t29: this.$('#t29').val(),
		t30: this.$('#t30').val(),
		t31: this.$('#t31').val(),
		t32: this.$('#t32').val(),
		t33: this.$('#t33').val(),
		t34: this.$('#t34').val(),
		t35: this.$('#t35').val(),
		t36: this.$('#t36').val(),
		t37: this.$('#t37').val(),
		t38: this.$('#t38').val(),
		t39: this.$('#t39').val(),
		t40: this.$('#t40').val(),
		t41: this.$('#t41').val(),
		t42: this.$('#t42').val(),
		t43: this.$('#t43').val(),
		t44: this.$('#t44').val(),
		t45: this.$('#t45').val(),
		t46: this.$('#t46').val(),
		t47: this.$('#t47').val(),
		t48: this.$('#t48').val(),
		t49: this.$('#t49').val(),
		t50: this.$('#t50').val()
	    };
	},
	
	createAiLog: function() {
	    Backbone.history.navigate(
		"logC/"+this.model.attributes.id,
		{trigger: true}
	    );
	},

	remove: function(){
	    _.each(this.view_list, function(v) { v.remove(); });
	    Backbone.View.prototype.remove.call(this);
	}
    });

    return CowView;
});
