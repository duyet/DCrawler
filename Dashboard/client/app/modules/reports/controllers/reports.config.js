(function () {
  'use strict';
  angular
    .module('com.module.reports')
    .run(function ($rootScope, gettextCatalog) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Reports'), 'bg-maroon',
        'ion-information', 0, 'app.reports.index');
      $rootScope.addMenu(gettextCatalog.getString('Reports'), 'app.reports.index', 'ion-information');
    });
})();
