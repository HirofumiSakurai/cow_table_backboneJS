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

	initialize: function() {
	},

	render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    return this;
	}
    });
    return CowNumberView;
});
