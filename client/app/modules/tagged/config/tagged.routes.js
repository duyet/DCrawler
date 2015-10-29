(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.tagged', {
          abstract: true,
          url: '/tagged',
          templateUrl: 'modules/tagged/views/main.html'
        })
        .state('app.tagged.list', {
          url: '',
          templateUrl: 'modules/tagged/views/list.html',
          controllerAs: 'ctrl',
          controller: function (tagged) {
            this.tagged = tagged;
          },
          resolve: {
            tagged: [
              'PostsService',
              function (PostsService) {
                return PostsService.getPosts();
              }
            ]
          }
        })
        .state('app.tagged.add', {
          url: '/add',
          templateUrl: 'modules/tagged/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            this.post = post;
            this.formFields = PostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function () {
              return {};
            }
          }
        })
        .state('app.tagged.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/tagged/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            console.log(post);
            this.post = post;
            this.formFields = PostsService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.tagged.view', {
          url: '/:id',
          templateUrl: 'modules/tagged/views/view.html',
          controllerAs: 'ctrl',
          controller: function (post) {
            this.post = post;
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        })
        .state('app.tagged.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            PostsService.deletePost(post.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id);
            }
          }
        });
    }
  );

})();
