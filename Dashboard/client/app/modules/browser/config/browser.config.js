(function () {
  'use strict';
  angular
    .module('com.module.browser')
    .run(function ($rootScope, Queue, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Browser'), 'app.browser.models', 'fa-globe');
    });

})();
