(function () {
  'use strict';
  angular
    .module('com.module.testzone')
  /**
   * @ngdoc function
   * @name com.module.about.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
    .controller('testZoneCtrl', function ($scope) {
      $scope.angular = angular;
    });

})();
