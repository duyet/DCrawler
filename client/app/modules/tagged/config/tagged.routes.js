(function() {
	'use strict';
	angular
		.module('com.module.tagged')
		.config(function($stateProvider) {
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
					controller: function(tagged) {
						this.tagged = tagged;
					},
					resolve: {
						tagged: [
							'TaggedpostsService',
							function(TaggedpostsService) {
								return TaggedpostsService.getTaggedposts();
							}
						]
					}
				})
				.state('app.tagged.add', {
					url: '/add',
					templateUrl: 'modules/tagged/views/form.html',
					controllerAs: 'ctrl',
					controller: function($state, TaggedpostsService, tagged) {
						this.tagged = tagged;
						this.formFields = TaggedpostsService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							TaggedpostsService.upsertTaggedpost(this.tagged).then(function() {
								$state.go('^.list');
							});
						};
					},
					resolve: {
						tagged: function() {
							return {};
						}
					}
				})
				.state('app.tagged.edit', {
					url: '/:id/edit',
					templateUrl: 'modules/tagged/views/form.html',
					controllerAs: 'ctrl',
					controller: function($state, TaggedpostsService, tagged) {
						console.log(tagged);
						this.tagged = tagged;
						this.formFields = TaggedpostsService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							TaggedpostsService.upsertTaggedpost(this.tagged).then(function() {
								$state.go('^.list');
							});
						};
					},
					resolve: {
						tagged: function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}
					}
				})
				.state('app.tagged.view', {
					url: '/:id',
					templateUrl: 'modules/tagged/views/view.html',
					controllerAs: 'ctrl',
					controller: function(tagged) {
						this.tagged = tagged;
					},
					resolve: {
						tagged: function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}
					}
				})
				.state('app.tagged.delete', {
					url: '/:id/delete',
					template: '',
					controllerAs: 'ctrl',
					controller: function($state, TaggedpostsService, tagged) {
						TaggedpostsService.deleteTaggedpost(tagged.id, function() {
							$state.go('^.list');
						}, function() {
							$state.go('^.list');
						});
					},
					resolve: {
						tagged: function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}
					}
				});
		});

})();
