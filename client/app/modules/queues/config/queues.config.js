(function () {
  'use strict';
  angular
    .module('com.module.queues')
    .run(function ($rootScope, Queue, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Queues'), 'app.queues.list', 'fa-calendar-o');

      Queue.find(function (data) {
        $rootScope.addDashboardBox('Queues', 'bg-purple', 'ion-calendar', data.length, 'app.queues.list');
      });

    });

})();
