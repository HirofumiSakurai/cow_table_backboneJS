;(function() {
var _View_, _Controller_, _App_;
_View_ = function (exports) {
  'use strict';
  var View = function (element) {
    this.element = element;
  };
  View.prototype.show = function () {
    this.element.style.display = 'block';
  };
  View.prototype.hide = function () {
    this.element.style.display = 'none';
  };
  return View;
}();
_Controller_ = function (exports) {
  'use strict';
  var View = _View_;
  var Controller = function () {
    this.view = new View(document.body);
  };
  return Controller;
}(_View_);
_App_ = function (exports) {
  'use strict';
  var Controller = _Controller_;
  var App = function () {
    this.controller = new Controller();
  };
  return App;
}(_Controller_);
(function (App) {
  'use strict';
  new App();
}(_App_));
}());