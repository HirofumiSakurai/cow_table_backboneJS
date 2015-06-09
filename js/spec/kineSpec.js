define(
  ['jquery', 'backbone', 'routers/router', 'jasmine-jquery'],
  function($, Backbone, Router){
    $('body').append('<div id="main"></div>')
    var myRouter = new Router();
    Backbone.history.start();

  describe("kineSpec", function(){
    it('is always true', function() {
      expect(1).toEqual(1);
    });
  });

  describe("exist first view", function () {
     it('has kine division', function () {
       expect($('#kine')).toExist();
       expect($('.cow-number')).not.toExist();
     });
    //  describe("async call of showKineView()", function(){
    //    beforeAll(function(done){
    //      myRouter.current_view.last_input = '160';
    //      myRouter.callback_function = done;
    //      myRouter.showKineView();
    //    });
    //    it('moved to cow-list view', function() {
    //      expect($('#cow-list')).toExist();
    //      expect($('.cow-number')).toExist();
    //    });
    //  });
  });
});
