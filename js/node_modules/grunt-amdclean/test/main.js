define('View', function(require, module, exports) {
    'use strict';

    var View = function(element) {
        this.element = element;
    };

    View.prototype.show = function() {
        this.element.style.display = 'block';
    };

    View.prototype.hide = function() {
        this.element.style.display = 'none';
    };

    return View;

});

define('Controller', ['View'], function(require, module, exports) {
    'use strict';

    var View = require('View');

    var Controller = function() {
        this.view = new View(document.body);
    };

    return Controller;

});

define('App', ['Controller'], function(require, module, exports) {
    'use strict';

    var Controller = require('Controller');

    var App = function() {
        this.controller = new Controller();
    };

    return App;

});

require(['App'], function(App) {
    'use strict';

    new App();

});