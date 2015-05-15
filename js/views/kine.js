define([
    'jquery', 
    'underscore', 
    'backbone',
    'js/views/cow_number.js',
    'text!templates/kine.html',
    'jqueryNumeric'
], function($, _, Backbone, CowNumberView, kineTemplate){
    var KineView = Backbone.View.extend({

	el: '#root',

	template: _.template(kineTemplate),

	view_list: [],
	
	events: {
	    "keypress #owner_id" : "searchOnEnter",
	},

	initialize: function() {
	    this.listenTo(this.collection, 'sync', this.renderCowNumber);
	    this.listenTo(this.collection, 'error', this.renderNoNumber);
	    this.view_list = [];
	    this.render();
	},

	render: function() {
	    this.$el.html(this.template());
	    this.input = $('#owner_id');
	    this.input.numeric({decimal: false,	negative: false});
	    if( this.last_input ) 
		this.input.val(this.last_input);
	    this.renderCowNumber();
	    return this;
	},

	renderCowNumber: function() {
	    this.$('#cow-list').html('');
	    if( this.input.val() === '') return;
	    if( this.collection.isEmpty() )
		this.$('#cow-list').append('該当する牛はいません。');
	    else {
		this.view_list = [];
		this.collection.each( function(cow){
		    var view = new CowNumberView({
			model: cow,
			router: this.router
		    }, this);
		    view.router = this.router;
		    this.view_list.push(view);
		    this.$('#cow-list').append(view.render().el);
		}, this);
	    }
	},

	renderNoNumber: function() {
		this.$('#cow-list').html('該当する牛はいません。');
	},

	searchOnEnter: function(e){
	    if (e.keyCode != 13) return;
	    if( this.input.val() === "") return;
	    _.each(this.view_list, function(v) { v.remove(); });
	    this.last_input = this.input.val();
	    this.$('#cow-list').html(
		'<font color="skyblue">お待ちください。</font>');
	    this.collection.fetch2({owner_id: parseInt(this.input.val())});
	},

	remove: function(){
	    _.each(this.view_list, function(v) { v.remove(); });
	    Backbone.View.prototype.remove.call(this);
	}
    });
    return KineView;
});
	  
