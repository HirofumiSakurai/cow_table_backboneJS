define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/aiLogShow.html',
    'text!templates/aiLogEdit.html',
    'models/aiLog',
], function($, _, Backbone, ShowTemp, EditTemp, AiLog){
    var AiLogView = Backbone.View.extend({

	el: '#root',

	templateS: _.template(ShowTemp),    // Show Static: to read, delete
	templateE: _.template(EditTemp),    // Edit: to create, update

	events: {
	    "click #create" : "createModel",
	    "click #back"   : "backToCow",
	    "click #toEdit"   : "naviToEdit",
	    "click #toDelete" : "naviToDelete",
	    "click #update" : "updateModel",
	    "click #destroy": "destroyModel",
	},

	initialize: function() {
	    this.method = this.model.method;
	    if( this.method === "create")
		this.render();
	    else{
		this.listenTo(this.model, 'sync', this.render);
		this.model.fetch();
	    }
	},

	render: function() {
	    if( this.method === "create" ){ // to create
		if( this.model.attributes.date === "" ){
		    this.model.attributes.date = this.today();
		}
		this.$el.html(this.templateE(this.model.attributes));
		$('#buttons').append('<button id="create">記録</button>');
	    } else if(this.method === "read"){
		this.$el.html(this.templateS(this.model.attributes));
		$('#buttons').append('<button id="back">戻る</button>');
		$('#buttons').append('<button id="toEdit">更新</button>');
		$('#buttons').append('<button id="toDelete">削除</button>');
	    } else if(this.method === "update"){ // to delete
		this.$el.html(this.templateE(this.model.attributes));
		$('#buttons').append('<button id="update">記録</button>');
	    } else if(this.method === "delete"){ // to delete
		this.$el.html(this.templateS(this.model.attributes));
		$('#buttons').append('<button id="destroy">削除</button>');
	    }
	    this.listenTo(this.model, 'sync', this.backToCow );
	},

	today: function() {
	    var date = new Date();
	    var year = date.getFullYear();
	    var m = date.getMonth();
	    var d = date.getDate();
	    month  = (m < 10)? "0" + m: m.toStrint();
	    date  = (d < 10)? "0" + d: d.toString();
	    return year + "-" + month + "-" + date;
	},

	createModel: function() {
	    this.model.set({
		date: $('#date').val(),
		state:  $('#state').val()
	    });
	    this.model.create(this.model.attributes);
	},

	backToCow: function(){
	    Backbone.history.navigate("#"+this.model.attributes.cow_no,
				      {trigger: true});
	},

	naviToDelete: function(){
	    Backbone.history.navigate("#logD/"+this.model.attributes.id,
				      {trigger: true});
	},

	naviToEdit: function(){
	    Backbone.history.navigate("#logU/"+this.model.attributes.id,
				      {trigger: true});
	},

	updateModel: function() {
	    this.model.set({
		date: $('#date').val(),
		state:  $('#state').val()
	    });
	    this.model.save();
	},

	destroyModel: function() {
	    this.model.destroy();
	},
    });

    return AiLogView;
});
