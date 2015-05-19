define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/aiLogShow.html',
    'text!templates/aiLogEdit.html',
    'models/aiLog'
], function($, _, Backbone, ShowTemp, EditTemp, AiLog){
    var AiLogView = Backbone.View.extend({

	el: 'div',

	templateS: _.template(ShowTemp),    // Show Static: to read, delete
	templateE: _.template(EditTemp),    // Edit: to create, update

	events: {
	    "click #create" : "createModel",
	    "click #back"   : "backToCow",
	    "click #toEdit"   : "naviToUpdate",
	    "click #toDelete" : "naviToDelete",
	    "click #update" : "updateModel",
	    "click #destroy": "destroyModel",
	    "click #cancel": "naviToCancel",
	},

	initialize: function() {
	    // this.owner_id = this.model.attributes.owner_id;
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
		$('#buttons').append('<button id="cancel">取り消し</button>');
		$('#buttons').append('<button id="update">記録</button>');
	    } else if(this.method === "delete"){ // to delete
		this.$el.html(this.templateS(this.model.attributes));
		$('#buttons').append('[確認]このログを削除してよいですか？');
		$('#buttons').append('<button id="cancel">取り消し</button>');
		$('#buttons').append('<button id="destroy">削除</button>');
	    }
	    return this;
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
		id: undefined,
		date: $('#date').val(),
		state:  $('#state').val(),
		owner_id: this.owner_id
	    });
	    this.model.create();
	    this.listenTo(this.model, "sync", function(){
		this.logCollection.add(this.model);
		this.navigate("next", this.model.attributes.cow_no);
	    });
	},

	backToCow: function(){
	    this.navigate("back", this.model.attributes.cow_no);
	},

	naviToUpdate: function(){
	    this.navigate("update", this.model.attributes.id);
	},

	naviToDelete: function(){
	    this.navigate("delete", this.model.attributes.id);
	},

	updateModel: function() {
	    this.model.set({
		date: $('#date').val(),
		state:  $('#state').val(),
		owner_id: this.owner_id
	    });
	    this.model.save();
	    this.listenTo(this.model, "sync", function(){
		this.navigate("next", this.model.attributes.cow_no);
	    });
	},

	destroyModel: function() {
	    this.model.destroy();
	    this.listenTo(this.model, "sync", function(){
		this.navigate("next", this.model.attributes.cow_no);
	    });
	},

	naviToCancel: function(){
	    this.navigate("cancel", this.model.attributes.id);
	}
    });

    return AiLogView;
});
