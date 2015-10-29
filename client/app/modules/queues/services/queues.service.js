(function () {
	'use strict';
	angular
		.module('com.module.queues')
		.service('QueuesService', function ($state, CoreService, Queue, gettextCatalog) {

			this.getQueues = function () {
				return Queue.find().$promise;
			};

			this.getQueue = function (id) {
				return Queue.findById({
					id: id
				}).$promise;
			};

			this.upsertQueue = function (queue) {
				return Queue.upsert(queue).$promise
					.then(function () {
						CoreService.toastSuccess(
							gettextCatalog.getString('Queue saved'),
							gettextCatalog.getString('Your queue is safe with us!')
						);
					})
					.catch(function (err) {
						CoreService.toastSuccess(
							gettextCatalog.getString('Error saving queue '),
							gettextCatalog.getString('This queue could no be saved: ') + err
						);
					}
				);
			};

			this.deleteQueue = function (id, successCb, cancelCb) {
				CoreService.confirm(
					gettextCatalog.getString('Are you sure?'),
					gettextCatalog.getString('Deleting this cannot be undone'),
					function () {
						Queue.deleteById({id: id}, function () {
							CoreService.toastSuccess(
								gettextCatalog.getString('Queue deleted'),
								gettextCatalog.getString('Your queue is deleted!'));
							successCb();
						}, function (err) {
							CoreService.toastError(
								gettextCatalog.getString('Error deleting queue'),
								gettextCatalog.getString('Your queue is not deleted! ') + err);
							cancelCb();
						});
					},
					function () {
						cancelCb();
					}
				);
			};

			this.getFormFields = function () {
				return [
					{
						key: 'url',
						type: 'input',
						templateOptions: {
							label: gettextCatalog.getString('URL'),
							required: true
						}
					},
					{
						key: 'parent',
						type: 'input',
						templateOptions: {
							label: gettextCatalog.getString('parent url id'),
							required: false
						}
					},
					{
						key: 'description',
						type: 'textarea',
						templateOptions: {
							label: gettextCatalog.getString('description'),
							required: false
						}
					},
					{
						key: 'seen',
						type: 'radio',
						templateOptions: {
							label: gettextCatalog.getString('is seen?'),
							required: true,
							default: false,
							options: [
								{
									name: "Yes",
									value: true
								},
								{
									name: "No",
									value: false
								}
							]
						}
					},
				];
			};

		});

})();
