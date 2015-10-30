(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .service('TaggedpostsService', function (CoreService, Taggedpost, gettextCatalog) {
      this.getTaggedposts = function () {
        return Taggedpost.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getTaggedpost = function (id) {
        return Taggedpost.findById({
          id: id
        }).$promise;
      };

      this.upsertTaggedpost = function (post) {
        return Taggedpost.upsert(post).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Taggedpost saved'),
              gettextCatalog.getString('Your post is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving post '),
              gettextCatalog.getString('This post could no be saved: ') + err
            );
          }
        );
      };

      this.deleteTaggedpost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Taggedpost.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Taggedpost deleted'),
                gettextCatalog.getString('Your post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting post'),
                gettextCatalog.getString('Your post is not deleted! ') + err);
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
            key: 'title',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title'),
              required: true
            }
          },
          {
            key: 'content',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Content'),
              required: true
            }
          },
          {
            key: 'image',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Image')
            }
          }
        ];
      };

    });

})();
