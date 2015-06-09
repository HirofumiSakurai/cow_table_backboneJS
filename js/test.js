require.config({
  paths: {
    jquery: 'libs/jquery',
    jqueryNumeric: 'libs/jquery.numeric',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
//    localstorage: 'libs/backbone.localStorage',
    dualstorage: 'libs/backbone.dualstorage'
  },

  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

    dualstorage: {
      deps: ['underscore', 'backbone'],
      exports: 'Backbone.DualStorage'
    }
  }

});

require(
  ['backbone', 'collection/aiLogs', 'models/aiLog', 'dualstorage'],
  function(Backbone, aiLogsCollection, aiLogsModel){
    var aiLogs  = new aiLogsCollection();
    aiLogs.once('sync', function(){
      console.log(aiLogs);
      aiLogs.create({id: undefined, cow_no: 786, date: "2015-04-18", state: "いい発情 だよ　test", owner_id: 160});
    });
    aiLogs.fetch({owner_id: 160});
  });
