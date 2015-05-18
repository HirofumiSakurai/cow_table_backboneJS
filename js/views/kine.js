define([
    'jquery', 
    'underscore', 
    'backbone',
    'js/views/cow_number.js',
    'text!templates/kine.html',
    'text!templates/kineL.html',
    'jqueryNumeric'
], function($, _, Backbone, CowNumberView, kineTemplate, loginTemplate){
    var KineView = Backbone.View.extend({

	el: 'div',

	template: _.template(kineTemplate),
	templateL: _.template(loginTemplate),

	view_list: [],
	
	events: {
	    "keypress #owner_id"  : "searchOnEnter",
	    "click    #createCow" : "naviToCreateCow"
	},

	initialize: function() {
	},

	render: function() {
	    if( this.method == "login" ){
		this.login = false;
		this.$el.html(this.templateL());
		this.input = this.$('#owner_id');
		this.input.numeric({decimal: false, negative: false});
		if( this.last_id ) 
		    this.input.val(this.last_input);
	    } else {
		this.$el.append(this.template({owner_id: this.id}));
		this.renderCowNumber();
	    }
	    return this;
	},

	renderCowNumber: function() {
	    this.$('#cow-list').html('');
	    this.view_list = [];
	    _.each(
		this.collection.models, 
		function(cow){
		    if( cow ){
			var view = new CowNumberView({
			    model: cow,
			}, this);
			this.view_list.push(view);
			view.router = this.router;
			view.route = this.route;
			view.navigate = this.navigate;
			this.$('#cow-list').append(view.render().el);
		    }
		}, this);
	},

	searchOnEnter: function(e){
	    if (e.keyCode != 13) return;
	    if( this.input.val() === "") return;
	    this.last_input = this.input.val();
	    this.$('#cow-list').html(
		'<font color="skyblue">お待ちください。</font>');
	    this.navigate("next", "");
	},

	naviToCreateCow: function() {
	    this.navigate("create");
	},

	remove: function(){
	    _.each(this.view_list, function(v) { v.remove(); });
	    Backbone.View.prototype.remove.call(this);
	}
    });
    return KineView;
});
	  
