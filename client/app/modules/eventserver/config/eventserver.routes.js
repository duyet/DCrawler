(function() {
	'use strict';
	angular
		.module('com.module.eventserver')
		.config(function($stateProvider) {
			$stateProvider
				.state('app.eventserver', {
					abstract: true,
					url: '/eventserver',
					templateUrl: 'modules/eventserver/views/main.html'
				})
				.state('app.eventserver.list', {
					url: '',
					templateUrl: 'modules/eventserver/views/list.html',
					controllerAs: 'ctrl',
					controller: function(eventserverService, ENV) {
						var that = this;
						this.ENV = ENV;

						eventserverService.getStatus().then(function(status) {
							console.log(status)
							that.serverStatus = status;
						}, function(err) {
							that.serverStatus = { status: 'die' };
						});

						eventserverService.getEventDatas(150).then(function(data) {
							that.eventsData = data;
						}, function(err) {
							alert('Some thing went wrong');
						})
					},
					resolve: {
					}
				})
		});

})();
