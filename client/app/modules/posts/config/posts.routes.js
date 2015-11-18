;(function () {
  'use strict'
  angular
    .module('com.module.posts')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.posts', {
          abstract: true,
          url: '/posts',
          templateUrl: 'modules/posts/views/main.html'
        })
        .state('app.posts.list', {
          url: '',
          templateUrl: 'modules/posts/views/list.html',
          controllerAs: 'ctrl',
          controller: function (posts, PostsService, User) {
            this.currentUser = User.getCurrent()
            this.posts = posts
            this.autohidepost = true

            var self = this
            this.setLabel = function (post, label) {
              post.label = label
              post.traincontent = this.getCleanContent(post.content)
              post.taggedUser = self.currentUser._id

              console.log('Assign ' + label + ' for ', post)
              PostsService.setLabel(post)
              if (this.autohidepost == true) {
                // Hide
              }
            }

            this.highLightContent = function (c) {
              var regex = /([a-zA-Z0-9]+\sđã\snói\:\s(.*)(Bấm để mở rộng...))/g

              var t = c.replace(regex, function (m) {
                if (!m) return ''
                return "<span class='blur'>" + m + '</span>'
              })
              return t
            }

            this.getCleanContent = function (c) {
              var regex = /([a-zA-Z0-9]+\sđã\snói\:\s(.*)(Bấm để mở rộng...))/g
              return c.replace(regex, '')
            }

          },
          resolve: {
            posts: [
              'PostsService',
              function (PostsService) {
                return PostsService.getPosts()
              }
            ]
          }
        })
        .state('app.posts.add', {
          url: '/add',
          templateUrl: 'modules/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            this.post = post
            this.formFields = PostsService.getFormFields()
            this.formOptions = {}
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list')
              })
            }
          },
          resolve: {
            post: function () {
              return {}
            }
          }
        })
        .state('app.posts.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/posts/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            console.log(post)
            this.post = post
            this.formFields = PostsService.getFormFields()
            this.formOptions = {}
            this.submit = function () {
              PostsService.upsertPost(this.post).then(function () {
                $state.go('^.list')
              })
            }
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id)
            }
          }
        })
        .state('app.posts.view', {
          url: '/:id',
          templateUrl: 'modules/posts/views/view.html',
          controllerAs: 'ctrl',
          controller: function (post) {
            this.post = post
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id)
            }
          }
        })
        .state('app.posts.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, PostsService, post) {
            PostsService.deletePost(post.id, function () {
              $state.go('^.list')
            }, function () {
              $state.go('^.list')
            })
          },
          resolve: {
            post: function ($stateParams, PostsService) {
              return PostsService.getPost($stateParams.id)
            }
          }
        })
    })

})()
