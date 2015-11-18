(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .run(function ($rootScope, Taggedpost, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Taggedposts'), 'app.tagged.list', 'fa-edit');

      Taggedpost.find(function (posts) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Taggedposts'), 'bg-red', 'ion-document-text', posts.length, 'app.posts.list');
      });

    });

})();
