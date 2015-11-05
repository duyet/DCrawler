(function() {
	'use strict';
	angular
		.module('com.module.eventserver')
		.factory(
			"EventServerRest", ['LoopBackResource', 'LoopBackAuth', 'ENV','$injector', function(Resource, LoopBackAuth, ENV, $injector) {
				var endpoint = ENV.serverConfig.eventServerUrl + '/events.json?accessKey=' + ENV.serverConfig['eventServerAccessToken'];
				var R = Resource(
					endpoint, {
						'id': '@id',
						'limit': '@limit'
					}, {
						"status": {
							url: ENV.serverConfig.eventServerUrl,
							method: "GET"
						},	
						"getSome": {
							url: endpoint + '&limit=:limit',
							method: "GET",
							isArray: true
						}
					}
				);

				R.modelName = "Container";

				
				return R;
			}])
		.service('eventserverService', function(CoreService, EventServerRest, gettextCatalog) {
			this.getStatus = function() {
				return EventServerRest.status().$promise;
			};

			this.getEventDatas = function(limit) {
				var limit = limit || 50;
				return EventServerRest.getSome({limit: limit}).$promise;
			};

			this.getFormFields = function() {
				return [{
					key: 'title',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('Title'),
						required: true
					}
				}, {
					key: 'content',
					type: 'textarea',
					templateOptions: {
						label: gettextCatalog.getString('Content'),
						required: true
					}
				}, {
					key: 'image',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('Image')
					}
				}];
			};

		});

})();
