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

      this.upsertQueue = function (event) {
        return Queue.upsert(event).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Queue saved'),
              gettextCatalog.getString('Your event is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving event '),
              gettextCatalog.getString('This event could no be saved: ') + err
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
                gettextCatalog.getString('Your event is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting event'),
                gettextCatalog.getString('Your event is not deleted! ') + err);
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
            key: 'name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'description',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Description'),
              required: true
            }
          },
          {
            key: 'startDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Start Date'),
              required: true
            }
          },
          {
            key: 'startDate',
            type: 'timepicker',
            templateOptions: {
              label: gettextCatalog.getString('Start Time')
            }
          },
          {
            key: 'endDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('End Date'),
              required: true
            }
          },
          {
            key: 'endDate',
            type: 'timepicker',
            templateOptions: {
              label: gettextCatalog.getString('End Time')
            }
          }
        ];
      };

    });

})();
