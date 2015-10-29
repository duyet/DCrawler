(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .run(function ($rootScope, Post, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Posts'), 'app.tagged.list', 'fa-edit');

      Post.find(function (posts) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Posts'), 'bg-red', 'ion-document-text', posts.length, 'app.posts.list');
      });

    });

})();
