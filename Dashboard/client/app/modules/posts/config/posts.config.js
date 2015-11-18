(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .run(function ($rootScope, Post, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Posts'), 'app.posts.list', 'fa-edit');
    });

})();
