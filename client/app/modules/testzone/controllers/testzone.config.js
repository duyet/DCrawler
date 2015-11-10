(function () {
  'use strict';
  angular
    .module('com.module.testzone')
    .run(function ($rootScope, gettextCatalog) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Test Zone'), 'bg-maroon',
        'ion-information', 0, 'app.testzone.index');
    });
})();
