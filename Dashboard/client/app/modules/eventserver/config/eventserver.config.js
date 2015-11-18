(function () {
  'use strict';
  angular
    .module('com.module.eventserver')
    .run(function ($rootScope, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Event Server'), 'app.eventserver.list', 'fa-book');
    });

})();
