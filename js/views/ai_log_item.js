define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/ai_log_item.html'
], function($, _, Backbone, AiLogItemTemplate){
    var CowNumberView = Backbone.View.extend({

	tagName: 'li',

	template: _.template(AiLogItemTemplate),

	events: {
    	    "click .ai-log-item"  : "navi2aiLogRead",
	    "click .delete-ai-log": "navi2aiLogDelete"
	},

	initialize: function() {
	},

	render: function() {
	    this.$el.html(this.template(this.model));
	    return this;
	},

	navi2aiLogRead: function() {
	    Backbone.history.navigate(
		"logR/"+this.model.id,
		{trigger: true, replace: true});
	},

	navi2aiLogDelete: function() {
	    Backbone.history.navigate(
		"logD/"+this.model.id,
		{trigger: true, replace: true});
	}
    });
    return CowNumberView;
});
