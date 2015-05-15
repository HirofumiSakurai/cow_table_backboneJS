define(['underscore', 'backbone', 'models/aiLog'],
       function(_, Backbone, aiLog) {
	   var AiLogsCollection = Backbone.Collection.extend({

	       model: aiLog,

	       url: "/rails/ai_logs/",
	   });
  return AiLogsCollection;
});
