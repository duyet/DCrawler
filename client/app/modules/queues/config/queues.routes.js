(function () {
  'use strict';
  angular
    .module('com.module.queues')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.queues', {
          abstract: true,
          url: '/queues',
          templateUrl: 'modules/queues/views/main.html'
        })
        .state('app.queues.list', {
          url: '',
          templateUrl: 'modules/queues/views/list.html',
          controllerAs: 'ctrl',
          controller: function (queues) {
            this.queues = queues;
          },
          resolve: {
            queues: function (QueuesService) {
              return QueuesService.getQueues();
            }
          }
        })
        .state('app.queues.add', {
          url: '/add',
          templateUrl: 'modules/queues/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, QueuesService, queue) {
            this.queue = queue;
            this.formFields = QueuesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              QueuesService.upsertQueue(this.queue).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            queue: function () {
              return {};
            }
          }
        })
        .state('app.queues.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/queues/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, QueuesService, queue) {
            console.log(queue);
            this.queue = queue;
            this.formFields = QueuesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              QueuesService.upsertQueue(this.queue).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            queue: function ($stateParams, QueuesService) {
              return QueuesService.getQueue($stateParams.id);
            }
          }
        })
        .state('app.queues.view', {
          url: '/:id',
          templateUrl: 'modules/queues/views/view.html',
          controllerAs: 'ctrl',
          controller: function (queue) {
            this.queue = queue;
          },
          resolve: {
            queue: function ($stateParams, QueuesService) {
              return QueuesService.getQueue($stateParams.id);
            }
          }
        })
        .state('app.queues.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, QueuesService, queue) {
            QueuesService.deleteQueue(queue.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            queue: function ($stateParams, QueuesService) {
              return QueuesService.getQueue($stateParams.id);
            }
          }
        });
    }
  );

})();
