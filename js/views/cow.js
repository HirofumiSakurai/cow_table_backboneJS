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
    'views/aiLog',
    'jqueryNumeric'
], function($, _, Backbone, cowTemp, cowTempE, daughterTemp,
	    Cow, AiLogModel,AiLogItem, AiLog){
    var CowView = Backbone.View.extend({

	el: 'div',

	template: _.template(cowTemp),
	templateE: _.template(cowTempE),
	daughterTemplate: _.template(daughterTemp),

	events: {
	    "click #back"     : "navi2backward",    // Read
	    "click #toupdate" : "navi2update",      // Read
	    "click #toDestroy": "navi2destroy",     // Read
	    "click #save"     : "saveModel",        // Cread, Update
	    "click #destroy"  : "destroyModel",     // Delete
	    "click #cancel"   : "navi2cancel",      // Cread, Update, Delete
	    "click #create-ai-log": "createAiLog"   
	},

	initialize: function() {
	},

	render: function() {
	    this.view_list = [];
	    if( _.find(["read", "destroy"], function(e){
		return this.method === e}, this)){
		this.$el.append(this.template(this.model.attributes));
		_.each(this.model.daughters, function(d){
		    if(this.collection.get(d.attributes.id) )
			$('#daughter-list').append(this.daughterTemplate(d));
		    else
			$('#daughter-list').append(d.ear_num);
		}, this);
		_.each(
		    this.logCollection.where({
		        cow_no: this.model.attributes.id }).models,
		    function(a){
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
			'<input type="button" value="戻る" id="back" />');
		}
	    } else if( _.find(["create", "update"], function(e){
		return this.method === e}, this)){
		this.$el.html(this.templateE(this.model.attributes));
		this.setNumerics();
	    }
	    return this;
	},

	navi2backward: function() {
	    Backbone.history.navigate(this.route["back"]);
	},

	navi2next: function() {
	    Backbone.history.navigate(
		this.route["next"]
		    +this.model.attributes.id, {trigger: true});
	},

	navi2update: function() {
	    Backbone.history.navigate(
		this.route["update"]
		    +this.model.attributes.id, {trigger: true});
	},

	navi2destory: function() {
	    Backbone.history.navigate(
		this.route["destroy"]
		    +this.model.attributes.id, {trigger: true});
	},

	saveModel: function() {
	    this.dataBinder();
	    if( this.method === "create" )
		this.model.attributes.id = undefined;
	    this.model.save();
	    Backbone.history.navigate(
		(this.method == "create")? 
		    this.route["next"] :
		    this.route["next"] + this.moel.attributes.id);
	},

	destroyModel: function() {
	    this.model.destroy();
	    Backbone.history.navigate(this.route["next"]);
	},

	navi2cancel: function() {
	    Backbone.history.navigate(
		(this.method == "create")? 
		    this.route["cancel"] :
		    this.route["cancel"] + this.moel.attributes.id);
	},

	createAiLog: function() {
	    Backbone.history.navigate(
		this.route["logCreate"]+this.model.attributes.id,
		{trigger: true}
	    );
	},

	dataBinder: function(){
	    var id = this.model.attributes.id;
	    this.model.attributes = {
		id:        id,
		ear_num:   this.$('#ear_num').val(),
		name:      this.$('#name').val(),
		sex:       (this.$('#sex-female').val()==="on")?"雌":"雄",
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
	
	setNumerics: function() {
	    this.$('#ear_num').numeric({decimal: false,	negative: false});
	    this.$('#owner_id').numeric({decimal: false,negative: false});
	    this.$('#parent').numeric({decimal: false,	negative: false});
	    this.$('#additional div input').numeric({decimal: false,negative: false});
	},

	remove: function(){
	    _.each(this.view_list, function(v) { v.remove(); });
	    Backbone.View.prototype.remove.call(this);
	}
    });

    return CowView;
});
