define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/cow.html'
], function($, _, Backbone, cowTemplate){
    var CowView = Backbone.View.extend({

	el: 'body',

	template: _.template(cowTemplate),

	events: {
	    "click #update" : "updateModel",
	    "click #destroy": "destroyModel"
	},

	initialize: function() {
	    this.render();
	},

	render: function() {
	    this.$el.html(this.template(this.model));
	    _.each(this.model.daughters, function(d){
		$('#daughter-list').append(d.name);
	    });
	    _.each(this.model.ai_logs, function(a){
		$('#ailog-list').append("<li>"+a.date+":"+a.state+"</li>");
	    });
	    return this;
	},

	updateModel: function() {
	    ;
	},

	destroyModel: function() {
	    ;
	}
    });

    return CowView;
});
