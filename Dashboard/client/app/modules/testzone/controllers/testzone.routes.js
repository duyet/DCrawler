(function() {
	'use strict';
	angular
		.module('com.module.testzone')
		.config(function($stateProvider) {
			$stateProvider
				.state('app.testzone', {
					abstract: true,
					url: '/testzone',
					templateUrl: 'modules/testzone/views/main.html'
				})
				.state('app.testzone.tokenizer', {
					url: '/tokenizer',
					templateUrl: 'modules/testzone/views/tokenizer.html',
					controllerAs: 'ctrl',
					controller: function() {
						this.formFields = [{
							key: 'description',
							type: 'textarea',
							templateOptions: {
								label: ('Text'),
								required: true
							}
						}];
						this.submit = function() {
							alert(this.textString)
						};
					}
				})
				.state('app.testzone.index', {
					url: '',
					templateUrl: 'modules/testzone/views/index.html',
					controllerAs: 'ctrl',
					controller: function() {

					}
				});
		});

})();
