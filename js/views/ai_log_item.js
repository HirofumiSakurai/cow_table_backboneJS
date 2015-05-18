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
	},

	initialize: function() {
	},

	render: function() {
	    this.$el.html(this.template(this.model.attributes));
	    return this;
	},

	navi2aiLogRead: function() {
	    this.navigate("logRead", this.model.id );
	},
    });
    return CowNumberView;
});
