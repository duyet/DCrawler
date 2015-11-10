(function () {
  'use strict';
  angular
    .module('com.module.crawlsettings')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.crawlsettings', {
          abstract: true,
          url: '/crawlsettings',
          templateUrl: 'modules/crawlsettings/views/main.html',
          controllerAs: 'ctrl',
          controller: function($rootScope) {
            this.box = $rootScope.dashboardBox;
          }
        })
        .state('app.crawlsettings.list', {
          url: '',
          templateUrl: 'modules/crawlsettings/views/list.html',
          controllerAs: 'ctrl',
          controller: function (crawlsettings) {
            this.crawlsettings = crawlsettings;
          },
          resolve: {
            crawlsettings: function (CrawlSettingService) {
              return CrawlSettingService.find();
            }
          }
        })
        .state('app.crawlsettings.add', {
          url: '/add',
          templateUrl: 'modules/crawlsettings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CrawlSettingService, setting) {
            this.setting = setting;
            this.formFields = CrawlSettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CrawlSettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            setting: function () {
              return {};
            }
          }
        })
        .state('app.crawlsettings.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/crawlsettings/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, CrawlSettingService, crawlsettings) {
            this.crawlsettings = crawlsettings;
            this.formFields = CrawlSettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CrawlSettingService.upsert(this.crawlsettings).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            crawlsettings: function ($stateParams, CrawlSettingService) {
              return CrawlSettingService.findById($stateParams.id);
            }
          }
        })
        .state('app.crawlsettings.view', {
          url: '/:id',
          templateUrl: 'modules/crawlsettings/views/view.html',
          controllerAs: 'ctrl',
          controller: function (crawlsettings) {
            this.crawlsettings = crawlsettings;
          },
          resolve: {
            crawlsettings: function ($stateParams, CrawlSettingService) {
              return CrawlSettingService.findById($stateParams.id);
            }
          }
        })
        .state('app.crawlsettings.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($stateParams, $state, CrawlSettingService) {
            CrawlSettingService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }
        });
    });

})();
