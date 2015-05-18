define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/cow_number.html'
], function($, _, Backbone, cowNumberTemplate){
    var CowNumberView = Backbone.View.extend({

	tagName: 'li',
	className: 'cow-number',

	template: _.template(cowNumberTemplate),

	events: {
    	    "click .cow-number"  : "navi2cow"
	},

	initialize: function() {
	},

	render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	},

	navi2cow: function() {
	    this.navigate("cow", this.model.attributes.id);
	}
    });
    return CowNumberView;
});
