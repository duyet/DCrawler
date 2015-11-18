(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name loopbackApp
   * @description
   * # loopbackApp
   *
   * Main module of the application.
   */
  angular
    .module('loopbackApp', [
      'angular-loading-bar',
      'angular.filter',
      'angularBootstrapNavTree',
      'angularFileUpload',
      'btford.markdown',
      'oitozero.ngSweetAlert',
      'config',
      'formly',
      'formlyBootstrap',
      'lbServices',
      'monospaced.elastic',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',
      'ui.codemirror',
      'ui.gravatar',
      'ui.grid',
      'ui.router',
      'toasty',
      'autofields',
      'gettext',
      'angular-underscore/filters',
      'schemaForm',
      'ui.select',
      'com.module.core',
      'com.module.about',
      //'com.module.browser',
      'com.module.queues',
      //'com.module.files',
      //'com.module.notes',
      //'com.module.pages',
      'com.module.posts',
      'com.module.tagged',
      'com.module.eventserver',
      //'com.module.products',
      //'com.module.sandbox',
      'com.module.settings',
      'com.module.crawlsettings',
      'com.module.testzone',
      'com.module.users'
    ])
    .run(["$rootScope", "$cookies", "gettextCatalog", function ($rootScope, $cookies, gettextCatalog) {

      $rootScope.locales = {
        'en': {
          lang: 'en',
          country: 'US',
          name: gettextCatalog.getString('English')
        }
      };

      var lang = $cookies.lang || navigator.language || navigator.userLanguage;

      $rootScope.locale = $rootScope.locales[lang];

      if ($rootScope.locale === undefined) {
        $rootScope.locale = $rootScope.locales[lang];
        if ($rootScope.locale === undefined) {
          $rootScope.locale = $rootScope.locales['en'];
        }
      }

      gettextCatalog.setCurrentLanguage($rootScope.locale.lang);

    }])
    .run(["formlyConfig", function (formlyConfig) {
      /*
       ngModelAttrs stuff
       */
      var ngModelAttrs = {};

      function camelize (string) {
        string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
          return chr ? chr.toUpperCase() : '';
        });
        // Ensure 1st char is always lowercase
        return string.replace(/^([A-Z])/, function (match, chr) {
          return chr ? chr.toLowerCase() : '';
        });
      }

      /*
       timepicker
       */
      ngModelAttrs = {};

      // attributes
      angular.forEach([
        'meridians',
        'readonly-input',
        'mousewheel',
        'arrowkeys'
      ], function (attr) {
        ngModelAttrs[camelize(attr)] = {attribute: attr};
      });

      // bindings
      angular.forEach([
        'hour-step',
        'minute-step',
        'show-meridian'
      ], function (binding) {
        ngModelAttrs[camelize(binding)] = {bound: binding};
      });

      formlyConfig.setType({
        name: 'timepicker',
        template: '<timepicker ng-model="model[options.key]"></timepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            timepickerOptions: {}
          }
        }
      });

      formlyConfig.setType({
        name: 'datepicker',
        template: '<datepicker ng-model="model[options.key]" ></datepicker>',
        wrapper: [
          'bootstrapLabel',
          'bootstrapHasError'
        ],
        defaultOptions: {
          ngModelAttrs: ngModelAttrs,
          templateOptions: {
            datepickerOptions: {}
          }
        }
      });
    }]);

})();

"use strict";

 angular.module('config', [])

.constant('ENV', {name:'production',apiUrl:'/api/',siteUrl:'',serverConfig:{restApiRoot:'/api',host:'0.0.0.0',port:3000,url:'http://localhost:3000/',cookieSecret:'F1FEE670-3C72-11E4-916C-0800200C9A66',legacyExplorer:true,eventServerUrl:'http://prediction.duyetdev.com:7070',eventServerAccessToken:'VrDubNB7Onlla92acTxanlWjYcvMTtoOtgV2u5nw4IGpgww2ISqU5nGFWVmS5IP4'}})

;
(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.AccessToken
 * @header lbServices.AccessToken
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AccessToken` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AccessToken",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/accessTokens/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use AccessToken.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/accessTokens/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#create
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#createMany
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#upsert
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/accessTokens",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#exists
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/accessTokens/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#findById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/accessTokens/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#find
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#findOne
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/accessTokens/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#updateAll
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/accessTokens/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#deleteById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/accessTokens/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#count
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/accessTokens/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#prototype$updateAttributes
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - AccessToken id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/accessTokens/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#createChangeStream
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/accessTokens/change-stream",
          method: "POST"
        },

        // INTERNAL. Use User.accessTokens.findById() instead.
        "::findById::user::accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.accessTokens.destroyById() instead.
        "::destroyById::user::accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.accessTokens.updateById() instead.
        "::updateById::user::accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.accessTokens() instead.
        "::get::user::accessTokens": {
          isArray: true,
          url: urlBase + "/users/:id/accessTokens",
          method: "GET"
        },

        // INTERNAL. Use User.accessTokens.create() instead.
        "::create::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST"
        },

        // INTERNAL. Use User.accessTokens.createMany() instead.
        "::createMany::user::accessTokens": {
          isArray: true,
          url: urlBase + "/users/:id/accessTokens",
          method: "POST"
        },

        // INTERNAL. Use User.accessTokens.destroyAll() instead.
        "::delete::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE"
        },

        // INTERNAL. Use User.accessTokens.count() instead.
        "::count::user::accessTokens": {
          url: urlBase + "/users/:id/accessTokens/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.AccessToken#updateOrCreate
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#update
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#destroyById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AccessToken#removeById
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.AccessToken#modelName
    * @propertyOf lbServices.AccessToken
    * @description
    * The name of the model represented by this $resource,
    * i.e. `AccessToken`.
    */
    R.modelName = "AccessToken";


        /**
         * @ngdoc method
         * @name lbServices.AccessToken#user
         * @methodOf lbServices.AccessToken
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - AccessToken id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::accessToken::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.RoleMapping
 * @header lbServices.RoleMapping
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `RoleMapping` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "RoleMapping",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/RoleMappings/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use RoleMapping.role() instead.
        "prototype$__get__role": {
          url: urlBase + "/RoleMappings/:id/role",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#create
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/RoleMappings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#createMany
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/RoleMappings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#upsert
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/RoleMappings",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#exists
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/RoleMappings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#findById
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/RoleMappings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#find
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/RoleMappings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#findOne
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/RoleMappings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#updateAll
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/RoleMappings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#deleteById
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/RoleMappings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#count
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/RoleMappings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#prototype$updateAttributes
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/RoleMappings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#createChangeStream
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/RoleMappings/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Role.principals.findById() instead.
        "::findById::Role::principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "GET"
        },

        // INTERNAL. Use Role.principals.destroyById() instead.
        "::destroyById::Role::principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Role.principals.updateById() instead.
        "::updateById::Role::principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Role.principals() instead.
        "::get::Role::principals": {
          isArray: true,
          url: urlBase + "/Roles/:id/principals",
          method: "GET"
        },

        // INTERNAL. Use Role.principals.create() instead.
        "::create::Role::principals": {
          url: urlBase + "/Roles/:id/principals",
          method: "POST"
        },

        // INTERNAL. Use Role.principals.createMany() instead.
        "::createMany::Role::principals": {
          isArray: true,
          url: urlBase + "/Roles/:id/principals",
          method: "POST"
        },

        // INTERNAL. Use Role.principals.destroyAll() instead.
        "::delete::Role::principals": {
          url: urlBase + "/Roles/:id/principals",
          method: "DELETE"
        },

        // INTERNAL. Use Role.principals.count() instead.
        "::count::Role::principals": {
          url: urlBase + "/Roles/:id/principals/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#updateOrCreate
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#update
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#destroyById
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#removeById
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.RoleMapping#modelName
    * @propertyOf lbServices.RoleMapping
    * @description
    * The name of the model represented by this $resource,
    * i.e. `RoleMapping`.
    */
    R.modelName = "RoleMapping";


        /**
         * @ngdoc method
         * @name lbServices.RoleMapping#role
         * @methodOf lbServices.RoleMapping
         *
         * @description
         *
         * Fetches belongsTo relation role.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.role = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::get::RoleMapping::role"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Role
 * @header lbServices.Role
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Role` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Role",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Roles/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Role.principals.findById() instead.
        "prototype$__findById__principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "GET"
        },

        // INTERNAL. Use Role.principals.destroyById() instead.
        "prototype$__destroyById__principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Role.principals.updateById() instead.
        "prototype$__updateById__principals": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Roles/:id/principals/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Role.principals() instead.
        "prototype$__get__principals": {
          isArray: true,
          url: urlBase + "/Roles/:id/principals",
          method: "GET"
        },

        // INTERNAL. Use Role.principals.create() instead.
        "prototype$__create__principals": {
          url: urlBase + "/Roles/:id/principals",
          method: "POST"
        },

        // INTERNAL. Use Role.principals.destroyAll() instead.
        "prototype$__delete__principals": {
          url: urlBase + "/Roles/:id/principals",
          method: "DELETE"
        },

        // INTERNAL. Use Role.principals.count() instead.
        "prototype$__count__principals": {
          url: urlBase + "/Roles/:id/principals/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#create
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Roles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#createMany
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Roles",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#upsert
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Roles",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#exists
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Roles/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#findById
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Roles/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#find
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Roles",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#findOne
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Roles/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#updateAll
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Roles/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#deleteById
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Roles/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#count
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Roles/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#prototype$updateAttributes
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Roles/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Role#createChangeStream
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Roles/change-stream",
          method: "POST"
        },

        // INTERNAL. Use RoleMapping.role() instead.
        "::get::RoleMapping::role": {
          url: urlBase + "/RoleMappings/:id/role",
          method: "GET"
        },

        // INTERNAL. Use User.roles.findById() instead.
        "::findById::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.roles.destroyById() instead.
        "::destroyById::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.updateById() instead.
        "::updateById::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.roles.link() instead.
        "::link::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.roles.unlink() instead.
        "::unlink::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.exists() instead.
        "::exists::user::roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.roles() instead.
        "::get::user::roles": {
          isArray: true,
          url: urlBase + "/users/:id/roles",
          method: "GET"
        },

        // INTERNAL. Use User.roles.create() instead.
        "::create::user::roles": {
          url: urlBase + "/users/:id/roles",
          method: "POST"
        },

        // INTERNAL. Use User.roles.createMany() instead.
        "::createMany::user::roles": {
          isArray: true,
          url: urlBase + "/users/:id/roles",
          method: "POST"
        },

        // INTERNAL. Use User.roles.destroyAll() instead.
        "::delete::user::roles": {
          url: urlBase + "/users/:id/roles",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.count() instead.
        "::count::user::roles": {
          url: urlBase + "/users/:id/roles/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Role#updateOrCreate
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Role#update
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Role#destroyById
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Role#removeById
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Role#modelName
    * @propertyOf lbServices.Role
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Role`.
    */
    R.modelName = "Role";

    /**
     * @ngdoc object
     * @name lbServices.Role.principals
     * @header lbServices.Role.principals
     * @object
     * @description
     *
     * The object `Role.principals` groups methods
     * manipulating `RoleMapping` instances related to `Role`.
     *
     * Call {@link lbServices.Role#principals Role.principals()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Role#principals
         * @methodOf lbServices.Role
         *
         * @description
         *
         * Queries principals of Role.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R.principals = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::get::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#count
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Counts principals of Role.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.principals.count = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::count::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#create
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Creates a new instance in principals of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R.principals.create = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::create::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#createMany
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Creates a new instance in principals of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R.principals.createMany = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::createMany::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#destroyAll
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Deletes all principals of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.principals.destroyAll = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::delete::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#destroyById
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Delete a related item by id for principals.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for principals
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.principals.destroyById = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::destroyById::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#findById
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Find a related item by id for principals.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for principals
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R.principals.findById = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::findById::Role::principals"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Role.principals#updateById
         * @methodOf lbServices.Role.principals
         *
         * @description
         *
         * Update a related item by id for principals.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for principals
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `RoleMapping` object.)
         * </em>
         */
        R.principals.updateById = function() {
          var TargetResource = $injector.get("RoleMapping");
          var action = TargetResource["::updateById::Role::principals"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.UserCredential
 * @header lbServices.UserCredential
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserCredential` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "UserCredential",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/userCredentials/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use UserCredential.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/userCredentials/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#create
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/userCredentials",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#createMany
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/userCredentials",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#upsert
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/userCredentials",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#exists
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/userCredentials/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#findById
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/userCredentials/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#find
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/userCredentials",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#findOne
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/userCredentials/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#updateAll
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/userCredentials/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#deleteById
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/userCredentials/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#count
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/userCredentials/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#prototype$updateAttributes
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - UserCredential id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/userCredentials/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#createChangeStream
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/userCredentials/change-stream",
          method: "POST"
        },

        // INTERNAL. Use User.credentials.findById() instead.
        "::findById::user::credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.credentials.destroyById() instead.
        "::destroyById::user::credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.credentials.updateById() instead.
        "::updateById::user::credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.credentials() instead.
        "::get::user::credentials": {
          isArray: true,
          url: urlBase + "/users/:id/credentials",
          method: "GET"
        },

        // INTERNAL. Use User.credentials.create() instead.
        "::create::user::credentials": {
          url: urlBase + "/users/:id/credentials",
          method: "POST"
        },

        // INTERNAL. Use User.credentials.createMany() instead.
        "::createMany::user::credentials": {
          isArray: true,
          url: urlBase + "/users/:id/credentials",
          method: "POST"
        },

        // INTERNAL. Use User.credentials.destroyAll() instead.
        "::delete::user::credentials": {
          url: urlBase + "/users/:id/credentials",
          method: "DELETE"
        },

        // INTERNAL. Use User.credentials.count() instead.
        "::count::user::credentials": {
          url: urlBase + "/users/:id/credentials/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.UserCredential#updateOrCreate
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#update
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#destroyById
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.UserCredential#removeById
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.UserCredential#modelName
    * @propertyOf lbServices.UserCredential
    * @description
    * The name of the model represented by this $resource,
    * i.e. `UserCredential`.
    */
    R.modelName = "UserCredential";


        /**
         * @ngdoc method
         * @name lbServices.UserCredential#user
         * @methodOf lbServices.UserCredential
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - UserCredential id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::userCredential::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.UserIdentity
 * @header lbServices.UserIdentity
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserIdentity` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "UserIdentity",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/userIdentities/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use UserIdentity.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/userIdentities/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#create
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/userIdentities",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#createMany
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/userIdentities",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#upsert
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/userIdentities",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#exists
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/userIdentities/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#findById
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/userIdentities/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#find
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/userIdentities",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#findOne
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/userIdentities/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#updateAll
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/userIdentities/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#deleteById
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/userIdentities/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#count
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/userIdentities/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#prototype$updateAttributes
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - UserIdentity id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/userIdentities/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#createChangeStream
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/userIdentities/change-stream",
          method: "POST"
        },

        // INTERNAL. Use User.identities.findById() instead.
        "::findById::user::identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.identities.destroyById() instead.
        "::destroyById::user::identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.identities.updateById() instead.
        "::updateById::user::identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.identities() instead.
        "::get::user::identities": {
          isArray: true,
          url: urlBase + "/users/:id/identities",
          method: "GET"
        },

        // INTERNAL. Use User.identities.create() instead.
        "::create::user::identities": {
          url: urlBase + "/users/:id/identities",
          method: "POST"
        },

        // INTERNAL. Use User.identities.createMany() instead.
        "::createMany::user::identities": {
          isArray: true,
          url: urlBase + "/users/:id/identities",
          method: "POST"
        },

        // INTERNAL. Use User.identities.destroyAll() instead.
        "::delete::user::identities": {
          url: urlBase + "/users/:id/identities",
          method: "DELETE"
        },

        // INTERNAL. Use User.identities.count() instead.
        "::count::user::identities": {
          url: urlBase + "/users/:id/identities/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#updateOrCreate
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#update
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#destroyById
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#removeById
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.UserIdentity#modelName
    * @propertyOf lbServices.UserIdentity
    * @description
    * The name of the model represented by this $resource,
    * i.e. `UserIdentity`.
    */
    R.modelName = "UserIdentity";


        /**
         * @ngdoc method
         * @name lbServices.UserIdentity#user
         * @methodOf lbServices.UserIdentity
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - UserIdentity id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::userIdentity::user"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Page
 * @header lbServices.Page
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Page` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Page",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/pages/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Page#create
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/pages",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#createMany
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/pages",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#upsert
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/pages",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#exists
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/pages/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#findById
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/pages/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#find
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/pages",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#findOne
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/pages/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#updateAll
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/pages/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#deleteById
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/pages/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#count
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/pages/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#prototype$updateAttributes
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/pages/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#createChangeStream
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/pages/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Page#html
         * @methodOf lbServices.Page
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `content` – `{string=}` - 
         */
        "html": {
          url: urlBase + "/pages/html",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Page#updateOrCreate
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Page` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Page#update
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Page#destroyById
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Page#removeById
         * @methodOf lbServices.Page
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Page#modelName
    * @propertyOf lbServices.Page
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Page`.
    */
    R.modelName = "Page";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Note
 * @header lbServices.Note
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Note` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Note",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/notes/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Note#create
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/notes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#createMany
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/notes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#upsert
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/notes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#exists
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/notes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#findById
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/notes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#find
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/notes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#findOne
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/notes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#updateAll
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/notes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#deleteById
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/notes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#count
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/notes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#prototype$updateAttributes
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/notes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Note#createChangeStream
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/notes/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Note#updateOrCreate
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Note` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Note#update
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Note#destroyById
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Note#removeById
         * @methodOf lbServices.Note
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Note#modelName
    * @propertyOf lbServices.Note
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Note`.
    */
    R.modelName = "Note";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Post
 * @header lbServices.Post
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Post` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Post",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/posts/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Post#create
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/posts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#createMany
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/posts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#upsert
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/posts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#exists
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/posts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#findById
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/posts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#find
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/posts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#findOne
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/posts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#updateAll
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/posts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#deleteById
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/posts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#count
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/posts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#prototype$updateAttributes
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - AppModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/posts/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#createChangeStream
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/posts/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Post#getRaw
         * @methodOf lbServices.Post
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `page` – `{number=}` - 
         *
         *  - `limit` – `{number=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "getRaw": {
          url: urlBase + "/posts/getRaw",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Post#updateOrCreate
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Post` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Post#update
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Post#destroyById
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Post#removeById
         * @methodOf lbServices.Post
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Post#modelName
    * @propertyOf lbServices.Post
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Post`.
    */
    R.modelName = "Post";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Setting
 * @header lbServices.Setting
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Setting` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Setting",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/settings/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Setting#create
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/settings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#createMany
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/settings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#upsert
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/settings",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#exists
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/settings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#findById
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/settings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#find
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/settings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#findOne
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/settings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#updateAll
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/settings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#deleteById
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/settings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#count
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/settings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#prototype$updateAttributes
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/settings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Setting#createChangeStream
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/settings/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Setting#updateOrCreate
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Setting` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Setting#update
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Setting#destroyById
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Setting#removeById
         * @methodOf lbServices.Setting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Setting#modelName
    * @propertyOf lbServices.Setting
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Setting`.
    */
    R.modelName = "Setting";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Product
 * @header lbServices.Product
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Product` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Product",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/products/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Product.category() instead.
        "prototype$__get__category": {
          url: urlBase + "/products/:id/category",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#create
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/products",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#createMany
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/products",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#upsert
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/products",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#exists
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/products/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#findById
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/products/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#find
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/products",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#findOne
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/products/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#updateAll
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/products/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#deleteById
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/products/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#count
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/products/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#prototype$updateAttributes
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/products/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Product#createChangeStream
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/products/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Category.products.findById() instead.
        "::findById::Category::products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "GET"
        },

        // INTERNAL. Use Category.products.destroyById() instead.
        "::destroyById::Category::products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Category.products.updateById() instead.
        "::updateById::Category::products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Category.products() instead.
        "::get::Category::products": {
          isArray: true,
          url: urlBase + "/categories/:id/products",
          method: "GET"
        },

        // INTERNAL. Use Category.products.create() instead.
        "::create::Category::products": {
          url: urlBase + "/categories/:id/products",
          method: "POST"
        },

        // INTERNAL. Use Category.products.createMany() instead.
        "::createMany::Category::products": {
          isArray: true,
          url: urlBase + "/categories/:id/products",
          method: "POST"
        },

        // INTERNAL. Use Category.products.destroyAll() instead.
        "::delete::Category::products": {
          url: urlBase + "/categories/:id/products",
          method: "DELETE"
        },

        // INTERNAL. Use Category.products.count() instead.
        "::count::Category::products": {
          url: urlBase + "/categories/:id/products/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Product#updateOrCreate
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Product#update
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Product#destroyById
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Product#removeById
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Product#modelName
    * @propertyOf lbServices.Product
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Product`.
    */
    R.modelName = "Product";


        /**
         * @ngdoc method
         * @name lbServices.Product#category
         * @methodOf lbServices.Product
         *
         * @description
         *
         * Fetches belongsTo relation category.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        R.category = function() {
          var TargetResource = $injector.get("Category");
          var action = TargetResource["::get::Product::category"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Category
 * @header lbServices.Category
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Category` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Category",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/categories/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Category.products.findById() instead.
        "prototype$__findById__products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "GET"
        },

        // INTERNAL. Use Category.products.destroyById() instead.
        "prototype$__destroyById__products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Category.products.updateById() instead.
        "prototype$__updateById__products": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/categories/:id/products/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Category.products() instead.
        "prototype$__get__products": {
          isArray: true,
          url: urlBase + "/categories/:id/products",
          method: "GET"
        },

        // INTERNAL. Use Category.products.create() instead.
        "prototype$__create__products": {
          url: urlBase + "/categories/:id/products",
          method: "POST"
        },

        // INTERNAL. Use Category.products.destroyAll() instead.
        "prototype$__delete__products": {
          url: urlBase + "/categories/:id/products",
          method: "DELETE"
        },

        // INTERNAL. Use Category.products.count() instead.
        "prototype$__count__products": {
          url: urlBase + "/categories/:id/products/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#create
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/categories",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#createMany
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/categories",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#upsert
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/categories",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#exists
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/categories/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#findById
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/categories/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#find
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/categories",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#findOne
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/categories/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#updateAll
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/categories/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#deleteById
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/categories/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#count
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/categories/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#prototype$updateAttributes
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/categories/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Category#createChangeStream
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/categories/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Product.category() instead.
        "::get::Product::category": {
          url: urlBase + "/products/:id/category",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Category#updateOrCreate
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Category` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Category#update
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Category#destroyById
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Category#removeById
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Category#modelName
    * @propertyOf lbServices.Category
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Category`.
    */
    R.modelName = "Category";

    /**
     * @ngdoc object
     * @name lbServices.Category.products
     * @header lbServices.Category.products
     * @object
     * @description
     *
     * The object `Category.products` groups methods
     * manipulating `Product` instances related to `Category`.
     *
     * Call {@link lbServices.Category#products Category.products()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Category#products
         * @methodOf lbServices.Category
         *
         * @description
         *
         * Queries products of Category.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R.products = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::get::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#count
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Counts products of Category.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.products.count = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::count::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#create
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Creates a new instance in products of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R.products.create = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::create::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#createMany
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Creates a new instance in products of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R.products.createMany = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::createMany::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#destroyAll
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Deletes all products of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.products.destroyAll = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::delete::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#destroyById
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Delete a related item by id for products.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for products
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.products.destroyById = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::destroyById::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#findById
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Find a related item by id for products.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for products
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R.products.findById = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::findById::Category::products"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Category.products#updateById
         * @methodOf lbServices.Category.products
         *
         * @description
         *
         * Update a related item by id for products.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for products
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Product` object.)
         * </em>
         */
        R.products.updateById = function() {
          var TargetResource = $injector.get("Product");
          var action = TargetResource["::updateById::Category::products"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Queue
 * @header lbServices.Queue
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Queue` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Queue",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/queque/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Queue#create
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/queque",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#createMany
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/queque",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#upsert
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/queque",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#exists
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/queque/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#findById
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/queque/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#find
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/queque",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#findOne
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/queque/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#updateAll
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/queque/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#deleteById
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/queque/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#count
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/queque/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#prototype$updateAttributes
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/queque/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Queue#createChangeStream
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/queque/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Queue#updateOrCreate
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Queue` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Queue#update
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Queue#destroyById
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Queue#removeById
         * @methodOf lbServices.Queue
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Queue#modelName
    * @propertyOf lbServices.Queue
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Queue`.
    */
    R.modelName = "Queue";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.AuthProvider
 * @header lbServices.AuthProvider
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AuthProvider` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AuthProvider",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/AuthProviders/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#create
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/AuthProviders",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#createMany
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/AuthProviders",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#upsert
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/AuthProviders",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#exists
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/AuthProviders/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#findById
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/AuthProviders/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#find
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/AuthProviders",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#findOne
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/AuthProviders/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#updateAll
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/AuthProviders/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#deleteById
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/AuthProviders/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#count
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/AuthProviders/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#prototype$updateAttributes
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/AuthProviders/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#createChangeStream
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/AuthProviders/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#updateOrCreate
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthProvider` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#update
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#destroyById
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AuthProvider#removeById
         * @methodOf lbServices.AuthProvider
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.AuthProvider#modelName
    * @propertyOf lbServices.AuthProvider
    * @description
    * The name of the model represented by this $resource,
    * i.e. `AuthProvider`.
    */
    R.modelName = "AuthProvider";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "User",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/users/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use User.accessTokens.findById() instead.
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.accessTokens.destroyById() instead.
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.accessTokens.updateById() instead.
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.identities.findById() instead.
        "prototype$__findById__identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.identities.destroyById() instead.
        "prototype$__destroyById__identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.identities.updateById() instead.
        "prototype$__updateById__identities": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/identities/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.credentials.findById() instead.
        "prototype$__findById__credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.credentials.destroyById() instead.
        "prototype$__destroyById__credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.credentials.updateById() instead.
        "prototype$__updateById__credentials": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/credentials/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.roles.findById() instead.
        "prototype$__findById__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "GET"
        },

        // INTERNAL. Use User.roles.destroyById() instead.
        "prototype$__destroyById__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.updateById() instead.
        "prototype$__updateById__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.roles.link() instead.
        "prototype$__link__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use User.roles.unlink() instead.
        "prototype$__unlink__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.exists() instead.
        "prototype$__exists__roles": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/users/:id/roles/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use User.accessTokens() instead.
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/users/:id/accessTokens",
          method: "GET"
        },

        // INTERNAL. Use User.accessTokens.create() instead.
        "prototype$__create__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "POST"
        },

        // INTERNAL. Use User.accessTokens.destroyAll() instead.
        "prototype$__delete__accessTokens": {
          url: urlBase + "/users/:id/accessTokens",
          method: "DELETE"
        },

        // INTERNAL. Use User.accessTokens.count() instead.
        "prototype$__count__accessTokens": {
          url: urlBase + "/users/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use User.identities() instead.
        "prototype$__get__identities": {
          isArray: true,
          url: urlBase + "/users/:id/identities",
          method: "GET"
        },

        // INTERNAL. Use User.identities.create() instead.
        "prototype$__create__identities": {
          url: urlBase + "/users/:id/identities",
          method: "POST"
        },

        // INTERNAL. Use User.identities.destroyAll() instead.
        "prototype$__delete__identities": {
          url: urlBase + "/users/:id/identities",
          method: "DELETE"
        },

        // INTERNAL. Use User.identities.count() instead.
        "prototype$__count__identities": {
          url: urlBase + "/users/:id/identities/count",
          method: "GET"
        },

        // INTERNAL. Use User.credentials() instead.
        "prototype$__get__credentials": {
          isArray: true,
          url: urlBase + "/users/:id/credentials",
          method: "GET"
        },

        // INTERNAL. Use User.credentials.create() instead.
        "prototype$__create__credentials": {
          url: urlBase + "/users/:id/credentials",
          method: "POST"
        },

        // INTERNAL. Use User.credentials.destroyAll() instead.
        "prototype$__delete__credentials": {
          url: urlBase + "/users/:id/credentials",
          method: "DELETE"
        },

        // INTERNAL. Use User.credentials.count() instead.
        "prototype$__count__credentials": {
          url: urlBase + "/users/:id/credentials/count",
          method: "GET"
        },

        // INTERNAL. Use User.roles() instead.
        "prototype$__get__roles": {
          isArray: true,
          url: urlBase + "/users/:id/roles",
          method: "GET"
        },

        // INTERNAL. Use User.roles.create() instead.
        "prototype$__create__roles": {
          url: urlBase + "/users/:id/roles",
          method: "POST"
        },

        // INTERNAL. Use User.roles.destroyAll() instead.
        "prototype$__delete__roles": {
          url: urlBase + "/users/:id/roles",
          method: "DELETE"
        },

        // INTERNAL. Use User.roles.count() instead.
        "prototype$__count__roles": {
          url: urlBase + "/users/:id/roles/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#create
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#createMany
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/users",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/users",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#exists
         * @methodOf lbServices.User
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/users/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/users/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#find
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/users",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#findOne
         * @methodOf lbServices.User
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/users/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#updateAll
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/users/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#deleteById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/users/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#count
         * @methodOf lbServices.User
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/users/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#createChangeStream
         * @methodOf lbServices.User
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/users/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#login
         * @methodOf lbServices.User
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/users/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#logout
         * @methodOf lbServices.User
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/users/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#confirm
         * @methodOf lbServices.User
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/users/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#resetPassword
         * @methodOf lbServices.User
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/users/reset",
          method: "POST"
        },

        // INTERNAL. Use AccessToken.user() instead.
        "::get::accessToken::user": {
          url: urlBase + "/accessTokens/:id/user",
          method: "GET"
        },

        // INTERNAL. Use UserCredential.user() instead.
        "::get::userCredential::user": {
          url: urlBase + "/userCredentials/:id/user",
          method: "GET"
        },

        // INTERNAL. Use UserIdentity.user() instead.
        "::get::userIdentity::user": {
          url: urlBase + "/userIdentities/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/users" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.User#modelName
    * @propertyOf lbServices.User
    * @description
    * The name of the model represented by this $resource,
    * i.e. `User`.
    */
    R.modelName = "User";

    /**
     * @ngdoc object
     * @name lbServices.User.accessTokens
     * @header lbServices.User.accessTokens
     * @object
     * @description
     *
     * The object `User.accessTokens` groups methods
     * manipulating `AccessToken` instances related to `User`.
     *
     * Call {@link lbServices.User#accessTokens User.accessTokens()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.User#accessTokens
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::get::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#count
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Counts accessTokens of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.accessTokens.count = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::count::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#create
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.create = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::create::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#createMany
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.createMany = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::createMany::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#destroyAll
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.accessTokens.destroyAll = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::delete::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#destroyById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.accessTokens.destroyById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::destroyById::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#findById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.findById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::findById::user::accessTokens"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.accessTokens#updateById
         * @methodOf lbServices.User.accessTokens
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AccessToken` object.)
         * </em>
         */
        R.accessTokens.updateById = function() {
          var TargetResource = $injector.get("AccessToken");
          var action = TargetResource["::updateById::user::accessTokens"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.identities
     * @header lbServices.User.identities
     * @object
     * @description
     *
     * The object `User.identities` groups methods
     * manipulating `UserIdentity` instances related to `User`.
     *
     * Call {@link lbServices.User#identities User.identities()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.User#identities
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries identities of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R.identities = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::get::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#count
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Counts identities of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.identities.count = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::count::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#create
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Creates a new instance in identities of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R.identities.create = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::create::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#createMany
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Creates a new instance in identities of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R.identities.createMany = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::createMany::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#destroyAll
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Deletes all identities of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.identities.destroyAll = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::delete::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#destroyById
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Delete a related item by id for identities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for identities
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.identities.destroyById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::destroyById::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#findById
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Find a related item by id for identities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for identities
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R.identities.findById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::findById::user::identities"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.identities#updateById
         * @methodOf lbServices.User.identities
         *
         * @description
         *
         * Update a related item by id for identities.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for identities
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserIdentity` object.)
         * </em>
         */
        R.identities.updateById = function() {
          var TargetResource = $injector.get("UserIdentity");
          var action = TargetResource["::updateById::user::identities"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.credentials
     * @header lbServices.User.credentials
     * @object
     * @description
     *
     * The object `User.credentials` groups methods
     * manipulating `UserCredential` instances related to `User`.
     *
     * Call {@link lbServices.User#credentials User.credentials()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.User#credentials
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries credentials of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R.credentials = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::get::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#count
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Counts credentials of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.credentials.count = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::count::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#create
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Creates a new instance in credentials of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R.credentials.create = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::create::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#createMany
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Creates a new instance in credentials of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R.credentials.createMany = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::createMany::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#destroyAll
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Deletes all credentials of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.credentials.destroyAll = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::delete::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#destroyById
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Delete a related item by id for credentials.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for credentials
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.credentials.destroyById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::destroyById::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#findById
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Find a related item by id for credentials.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for credentials
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R.credentials.findById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::findById::user::credentials"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.credentials#updateById
         * @methodOf lbServices.User.credentials
         *
         * @description
         *
         * Update a related item by id for credentials.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for credentials
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `UserCredential` object.)
         * </em>
         */
        R.credentials.updateById = function() {
          var TargetResource = $injector.get("UserCredential");
          var action = TargetResource["::updateById::user::credentials"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.User.roles
     * @header lbServices.User.roles
     * @object
     * @description
     *
     * The object `User.roles` groups methods
     * manipulating `Role` instances related to `User`.
     *
     * Call {@link lbServices.User#roles User.roles()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.User#roles
         * @methodOf lbServices.User
         *
         * @description
         *
         * Queries roles of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::get::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#count
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Counts roles of user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.roles.count = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::count::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#create
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Creates a new instance in roles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.create = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::create::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#createMany
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Creates a new instance in roles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.createMany = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::createMany::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#destroyAll
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Deletes all roles of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.roles.destroyAll = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::delete::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#destroyById
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Delete a related item by id for roles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.roles.destroyById = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::destroyById::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#exists
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Check the existence of roles relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.exists = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::exists::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#findById
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Find a related item by id for roles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.findById = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::findById::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#link
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Add a related item by id for roles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.link = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::link::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#unlink
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Remove the roles relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.roles.unlink = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::unlink::user::roles"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.User.roles#updateById
         * @methodOf lbServices.User.roles
         *
         * @description
         *
         * Update a related item by id for roles.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for roles
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Role` object.)
         * </em>
         */
        R.roles.updateById = function() {
          var TargetResource = $injector.get("Role");
          var action = TargetResource["::updateById::user::roles"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Meta
 * @header lbServices.Meta
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Meta` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Meta",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Meta/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Meta#getModels
         * @methodOf lbServices.Meta
         *
         * @description
         *
         * Get all Models
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meta` object.)
         * </em>
         */
        "getModels": {
          isArray: true,
          url: urlBase + "/Meta",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Meta#getModelById
         * @methodOf lbServices.Meta
         *
         * @description
         *
         * Get a Model by name
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `name` – `{*}` - Model name
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Meta` object.)
         * </em>
         */
        "getModelById": {
          url: urlBase + "/Meta/:name",
          method: "GET"
        },
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Meta#modelName
    * @propertyOf lbServices.Meta
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Meta`.
    */
    R.modelName = "Meta";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Taggedpost
 * @header lbServices.Taggedpost
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Taggedpost` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Taggedpost",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/taggedpost/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#create
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/taggedpost",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#createMany
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/taggedpost",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#upsert
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/taggedpost",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#exists
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/taggedpost/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#findById
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/taggedpost/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#find
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/taggedpost",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#findOne
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/taggedpost/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#updateAll
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/taggedpost/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#deleteById
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/taggedpost/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#count
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/taggedpost/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#prototype$updateAttributes
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/taggedpost/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#createChangeStream
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/taggedpost/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#updateOrCreate
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Taggedpost` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#update
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#destroyById
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Taggedpost#removeById
         * @methodOf lbServices.Taggedpost
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Taggedpost#modelName
    * @propertyOf lbServices.Taggedpost
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Taggedpost`.
    */
    R.modelName = "Taggedpost";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.CrawlSetting
 * @header lbServices.CrawlSetting
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CrawlSetting` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "CrawlSetting",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/crawlSettings/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#create
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/crawlSettings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#createMany
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/crawlSettings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#upsert
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/crawlSettings",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#exists
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/crawlSettings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#findById
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/crawlSettings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#find
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/crawlSettings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#findOne
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/crawlSettings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#updateAll
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/crawlSettings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#deleteById
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/crawlSettings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#count
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/crawlSettings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#prototype$updateAttributes
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/crawlSettings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#createChangeStream
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/crawlSettings/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#updateOrCreate
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `CrawlSetting` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#update
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#destroyById
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.CrawlSetting#removeById
         * @methodOf lbServices.CrawlSetting
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.CrawlSetting#modelName
    * @propertyOf lbServices.CrawlSetting
    * @description
    * The name of the model represented by this $resource,
    * i.e. `CrawlSetting`.
    */
    R.modelName = "CrawlSetting";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Pm
 * @header lbServices.Pm
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Pm` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Pm",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/pm2/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Pm#create
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/pm2",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#createMany
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/pm2",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#upsert
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/pm2",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#exists
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/pm2/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#findById
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/pm2/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#find
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/pm2",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#findOne
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/pm2/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#updateAll
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/pm2/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#deleteById
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/pm2/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#count
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/pm2/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#prototype$updateAttributes
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/pm2/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#createChangeStream
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/pm2/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#listProcess
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "listProcess": {
          url: urlBase + "/pm2/list",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Pm#restartProcess
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `proc_name` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        "restartProcess": {
          url: urlBase + "/pm2/restart",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Pm#updateOrCreate
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Pm` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Pm#update
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Pm#destroyById
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Pm#removeById
         * @methodOf lbServices.Pm
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Pm#modelName
    * @propertyOf lbServices.Pm
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Pm`.
    */
    R.modelName = "Pm";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Container
 * @header lbServices.Container
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Container` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Container",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/containers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Container#getContainers
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getContainers": {
          isArray: true,
          url: urlBase + "/containers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#createContainer
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "createContainer": {
          url: urlBase + "/containers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#destroyContainer
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "destroyContainer": {
          url: urlBase + "/containers/:container",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#getContainer
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getContainer": {
          url: urlBase + "/containers/:container",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#getFiles
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getFiles": {
          isArray: true,
          url: urlBase + "/containers/:container/files",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#getFile
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "getFile": {
          url: urlBase + "/containers/:container/files/:file",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#removeFile
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `` – `{undefined=}` - 
         */
        "removeFile": {
          url: urlBase + "/containers/:container/files/:file",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#upload
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `req` – `{object=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `result` – `{object=}` - 
         */
        "upload": {
          url: urlBase + "/containers/:container/upload",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#download
         * @methodOf lbServices.Container
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `container` – `{string=}` - 
         *
         *  - `file` – `{string=}` - 
         *
         *  - `res` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "download": {
          url: urlBase + "/containers/:container/download/:file",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#create
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/containers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#createMany
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/containers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#upsert
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/containers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#exists
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/containers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#findById
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/containers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#find
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/containers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#findOne
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/containers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#updateAll
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/containers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#deleteById
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/containers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#count
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/containers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#prototype$updateAttributes
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/containers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Container#createChangeStream
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/containers/change-stream",
          method: "POST"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Container#updateOrCreate
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Container` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Container#update
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Container#destroyById
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Container#removeById
         * @methodOf lbServices.Container
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Container#modelName
    * @propertyOf lbServices.Container
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Container`.
    */
    R.modelName = "Container";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);

angular.module('loopbackApp').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de', {"About":"Über","Actions":"Aktion","Add":"Hinzufügen","Add a new event":"Ereignis hinzufügen","Add a new setting":"Einstellung hinzufügen","Are you sure?":"Bist du sicher ?","Browse":"Browse","Cancel":"Abbrechen","Cancel all":"Alles Abbrechen","Categories":"Kategorien","Category deleted":"Kategorie gelöscht","Category saved":"Kategorie gespeichert","Change it here!":"Ändere es hier !","Confirm Password":"Bestätige Passwort","Could not add event!":"Konnte Ereignis nicht hinzufügen","Could not add setting!":"Konnte Einstellung nicht hinzufügen","Current user":"Derzeitiger Nutzer","Dashboard":"Instrumententafel","Deleting this cannot be undone":"Löschen kann nicht wiederufen werden","Don't worry we won't spam your inbox":"Keine Sorge wir versenden keinen Spam","Edit event":"Ereignis editieren","Edit setting":"Einstellung editieren","Email address needs to be valid":"Die E-Mail -Adresse muss gültig sein","Enjoy the new you!":"Genieße deine neue Persönlichkeit ","Error deleting category":"Fehler beim löschen der Kategorie","Error deleting event":"Fehler beim löschen des Ereignises","Error deleting page":"Fehler beim löschen der Seite","Error deleting post":"Fehler beim löschen des Beitrags","Error deleting product":"Fehler beim löschen des Produkts","Error deleting setting":"Fehler beim löschen der Einstellung","Error deleting user":"Fehler beim löschen des Nutzers","Error registering!":"Fehler bei der Registrierung","Error saving profile":"Fehler beim speichern des Profils","Error saving user:":"Fehler beim speichern des Nutzers","Error signin in after registration!":"Fehler beim Einloggen nach der Registrierung","Event deleted":"Ereignis gelöscht","Event not added":"Ereignis nicht hinzugefügt","Event saved":"Ereignis gespeichert","Events":"Ereignis","File deleted":"Datei gelöscht","Files":"Dateien","First Name":"Vorname","Home":"Ausgangsposition","Key":"Schlüssel","Last Name":"Nachname","Logged in":"Eingeloggt","Logged out":"Ausgeloggt","Manage your events here!":"Verwalte deine Ereignisse hier","Manage your files here!":"Verwalte deine Dateien hier","Manage your settings here!":"Verwalte deine Einstellungen hier","Manager your users here!":"Verwalte deine Nutzer hier","More info":"Mehr Information","Name":"Name","Needs to have at least 4 characters":"Muss aus mindestens 4 Zeichen bestehen","Nice email address!":"Korrekte E-Mail Adresse !","Notes":"Anmerkungen","Or register":"Oder registriere","Or sign in":"oder Einloggen","Page deleted":"Seite gelöscht","Page saved":"Seite gespeichert","Pages":"Seiten","Password":"Passwort","Post deleted":"Beitrag gelöscht","Post saved":"Beitrag gespeichert","Posts":"Beitrag","Product deleted":"Produkt gelöscht","Product saved":"Produkt gespeichert","Products":"Produkt","Profile":"Profil","Profile saved":"Profil gespeichert","Progress":"Fortschritt","Register":"Registrieren","Registered":"Registriert","Remove all":"Alles Entfernen","Setting deleted":"Einstellung gelöscht","Setting saved":"Einstellung gespeichert","Settings":"Einstellung","Sign In":"Einloggen","Sign in":"Einloggen","Sign out":"Ausloggen","Size":"Grösse","Status":"Zustand","Stay signed in":"Eingeloggt bleiben","Submit":"Übermitteln","Theme":"Motiv","There are no events":"Keine Ereignisse vorhanden","There are no files":"Keine Daten vorhanden","There are no settings":"Keine Einstellungen vorhanden","This user is save!":"Dieser Nutzer ist geschützt ","Toggle navigation":"Orientierung wechseln","Update profile":"Profil aktualisieren","Upload":"Hochladen","Upload all":"Alles hochladen","Upload files":"Daten hochladen","Upload queue":"Warteschlange hochladen","User deleted":"Nutzer gelöscht","User saved":"Nutzer gespeichert","Users":"Nutzer","Value":"Wert","Variables":"Variable ","Welcome!":"Willkommen","You are logged in!":"Du bist Eingeloggt !","You are logged out!":"Du bist Ausgeloggt !","You are registered!":"Du bist Registeriert !","You can just drag them in this window!":"Du kannst Sie in dieses Fester ziehen","You need an email address":"Du brauchst eine E-Mail Adresse","Your Gravatar":"Dein Gravatar ","Your category is deleted!":"Deine Kategorie ist gelöscht !","Your category is not deleted:":"Deine Kategorie ist nicht gelöscht","Your category is safe with us!":"Deine Kategorie ist sicher bei uns !","Your event is deleted!":"Dein Ereignis ist gelöscht","Your event is not deleted:":"Dein Ereignis ist nicht gelöscht","Your event is safe with us!":"Dein Ereignis ist sicher bei uns","Your file is deleted!":"Deine Datei ist gelöscht","Your page is deleted!":"Deine Seite ist gelöscht","Your page is not deleted:":"Deine Seite ist nicht gelöscht:","Your page is safe with us!":"Deine Seite ist sicher bei uns !","Your post is deleted!":"Dein Beitrag ist gelöscht!","Your post is not deleted:":"Dein Beitrag ist nicht gelöscht:","Your post is safe with us!":"Dein Beitrag ist sicher bei uns !","Your product is deleted!":"Dein Produkt ist gelöscht!","Your product is not deleted:":"Dein Produkt ist nicht gelöscht:","Your product is safe with us!":"Dein Produkt ist sicher bei uns!","Your profile":"Dein Profil","Your profile is not saved:":"Dein Profil ist nicht gespeichert","Your setting is deleted!":"Deine Einstellungen sind gespeichert!","Your setting is not deleted:":"Deine Einstellungen sind nicht gelöscht:","Your setting is safe with us!":"Deine Einstellungen sind sicher bei uns!","Your user is deleted!":"Dein Nutzer ist gelöscht!","Your user is not deleted:":"Dein Nutzer ist nicht gelöscht:","here":"Hier","in queue":"In der Ereigniskette"});
    gettextCatalog.setStrings('es_MX', {"<i class=\"fa fa-arrow-left\"></i> Pages":"<i class=\"fa fa-arrow-left\"></i> Páginas","<i class=\"fa fa-arrow-left\"></i> Users":"<i class=\"fa fa-arrow-left\"></i> Usuarios","<i class=\"fa fa-save\"></i>  Save":"<i class=\"fa fa-save\"></i>  Guardar","<i class=\"fa fa-save\"></i> Save":"<i class=\"fa fa-save\"></i> Guardar","About":"Acerca de","Actions":"Acciones","Add":"Añadir","Add Category":"Añadir Categoría","Add Product":"Añadir Producto","Add a new category":"Añadir una nueva categoría","Add a new event":"Añadir un nuevo evento","Add a new note":"Añadir nueva nota","Add a new post":"Añadir una nueva publicación","Add a new product":"Añadir un nuevo producto","Add a new setting":"Añadir una nueva configuración","Add product to category":"Añadir producto a una categoría","All about this application!":"¡Todo acerca de esta aplicación!","Are you sure?":"¿Esta seguro?","Body":"Cuerpo","Browse":"Buscar","Cancel":"Cancelar","Cancel all":"Cancelar todo","Categories":"Categorias","Category":"Categoría","Category deleted":"Categoría eliminada","Category saved":"Categoria guardada","Change it here!":"¡Cambielo aquí!","Click <a href=\"\" ui-sref=\"^.add\">here</a>\n      to add a post!":"¡Haga click <a href=\"\" ui-sref=\"^.add\">aquí</a>\n      para añadir una nueva publicación!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a event!":"¡Haga click <a href=\"\" ui-sref=\"^.add\">aquí</a> para añadir un evento!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a note!":"¡Haga click <a href=\"\" ui-sref=\"^.add\">aquí</a> para añadir una nota!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a page!":"¡Haga click <a href=\"\" ui-sref=\"^.add\">aquí</a> para añadir una pagina!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a setting!":"¡Haga click <a href=\"\" ui-sref=\"^.add\">aquí</a> para añadir una configuración!","Click <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">here</a> to add a product!":"¡Haga click <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">aquí</a> para añadir un producto!","Click <a href=\"\" ui-sref=\"^.upload\" translate=\"\">here</a> to upload some!":"¡Haga click <a href=\"\" ui-sref=\"^.upload\" translate=\"\">aquí</a> para subir algo!","Confirm Password":"Confirme Contraseña","Content":"Contenido","Could not add category!":"¡No se pudo añadir la categoría!","Could not add event!":"¡No se pudo añadir el evento!","Could not add note!":"¡No se pudo añadir la nota!","Could not add page!":"¡No se pudo añadir la pagina!","Could not add post!":"¡No se pudo añadir la publicación!","Could not add setting!":"¡No se pudo añadir la configuración!","Could not add user!":"¡No se pudo añadir el usuario!","Create pages with rich content!":"¡Cree paginas con rico contenido!","Current user":"Usuario Actual","Dashboard":"Panel de control","Delete category":"Eliminar categoría","Deleting this cannot be undone":"Al eliminar esto no se podrá deshacer","Description":"Descripción","Don't worry we won't spam your inbox":"No se preocupe, no le enviaremos spam","Edit category":"Editar Categoría","Edit event":"Editar evento","Edit note":"Editar nota","Edit post":"Editar publicación","Edit product":"Editar producto","Edit setting":"Editar configuración","Email address needs to be valid":"Se necesita un correo electronico valido","End":"Fin","End Time":"Fin del tiempo","Enjoy the new you!":"¡Disfruta el nuevo tu!","Error deleting category":"Error al eliminar la categoria","Error deleting event":"Error al eliminar el evento","Error deleting item:":"Error al eliminar el elemento:","Error deleting note":"Error al eliminar la nota","Error deleting page":"Error al eliminar la pagina","Error deleting product":"Error al eliminar el producto","Error deleting setting":"Error al eliminar la configuración","Error deleting user":"Error al eliminar el usuario","Error registering!":"¡Error al registrar!","Error saving note":"Error al guardar la nota","Error saving profile":"Error al guardar el perfil","Error saving user:":"Error al guardar el usuario:","Error signin in after registration!":"¡Error al iniciar sesión después de registrarse!","Event deleted":"Evento eliminado","Event not added":"Evento no añadido","Event saved":"Evento guardado","Events":"Eventos","File deleted":"Archivo eliminado","Files":"Archivos","First Name":"Nombre","First name":"Nombre","Hello,":"Hola,","Home":"Principal","Item deleted":"Elemento eliminado","Last Name":"Apellido","Last name":"Apellido","Logged in":"Logueado","Logged out":"Deslogueado","Manage your events here!":"¡Administre sus eventos aquí!","Manage your files here!":"¡Administre sus archivos aquí!","Manage your notes here!":"¡Administre sus notas aquí!","Manage your posts here!":"¡Administre sus publicaciones aquí!","Manage your products here!":"¡Administre sus productos aquí!","Manage your settings here!":"¡Administre sus configuraciones aquí!","Manager your users here!":"¡Administre los usuarios aquí!","More info":"Mas Información","Name":"Nombre","Needs to have at least 4 characters":"Debe contener por lo menos 4 caracteres","New page":"Nueva pagina","Nice email address!":"¡Buen correo electrónico!","Note deleted":"Nota eliminada","Note saved":"Nota guardada","Notes":"Notas","Or register":"Ó regístrese","Or sign in":"Ó inicie sesión","Page deleted":"Pagina eliminada","Page saved":"Pagina guardada","Pages":"Paginas","Password":"Contraseña","Post saved":"Publicación guardada","Posts":"Publicaciones","Price":"Precio","Product":"Producto","Product deleted":"Producto eliminado","Product saved":"Producto guardado","Products":"Productos","Profile":"Perfil","Profile saved":"Perfil guardado","Progress":"Progreso","Register":"Registro","Registered":"Registrado","Remove all":"Remover todos","Save":"Guardar","Setting deleted":"Configuración eliminada","Setting saved":"Configuración guardada","Settings":"Configuración","Sign In":"Iniciar Sesión","Sign in":"Iniciar sesión","Sign out":"Cerrar sesión","Size":"Tamaño","Start Date":"Fecha de inicio","Start Time":"Hora de inicio","Status":"Estado","Stay signed in":"Mantener sesión","Submit":"Enviar","Theme":"Tema","There are no events":"No hay eventos","There are no files":"No hay archivos","There are no notes":"No hay notas","There are no pages":"No hay paginas","There are no products in this category!":"¡No hay productos en esta categoría!","There are no settings":"No hay configuraciones","This note could no be saved:":"Esta nota no pudo ser guardada:","This user is save!":"¡El usuario esta guardado!","Title":"Titulo","Toggle navigation":"Mostrar navegación","Update profile":"Actualizar perfil","Upload":"Subir","Upload all":"Subir todos","Upload files":"Subir archivos","Upload queue":"Cola de subida","User deleted":"Usuario eliminado","User saved":"Usuario guardado","Username":"Nombre de usuario","Users":"Usuarios","Value":"Valor","Variables":"Variables","Welcome!":"¡Bienvenido!","You are logged in!":"¡Has iniciado sesión!","You are logged out!":"¡Has cerrado sesión!","You are registered!":"¡Estas registrado!","You can just drag them in this window!":"¡Puedes arrastrarlas a esta ventana!","You need an email address":"Necesitas un correo electrónico","Your Gravatar":"Tu Gravatar","Your category is deleted!":"¡Tu categoría esta eliminada!","Your category is not deleted:":"Tu categoría no esta eliminada:","Your category is safe with us!":"¡Tu categoría esta segura con nosotros!","Your event is deleted!":"¡Tu evento esta eliminado!","Your event is not deleted:":"Tu evento no esta eliminado:","Your event is safe with us!":"¡Tu evento esta seguro con nosotros!","Your file is deleted!":"¡Tu archivo esta eliminado!","Your item has been deleted!":"¡Tu elemento ha sido eliminado!","Your note is deleted!":"¡Tu nota esta eliminada!","Your note is not deleted!":"¡Tu nota no esta borrada!","Your note is safe with us!":"¡Tu nota esta segura con nosotros!","Your page is deleted!":"¡Tu pagina esta borrada!","Your page is not deleted:":"Tu pagina no esta borrada","Your page is safe with us!":"¡Tu pagina esta segura con nosotros!","Your passwords need to match":"Tus contraseñas deben coincidir","Your post is safe with us!":"¡Tu publicación esta segura con nosotros!","Your product is deleted!":"¡Tu producto esta eliminado!","Your product is not deleted:":"Tu producto no esta borrado:","Your product is safe with us!":"¡Tu producto esta seguro con nosotros!","Your profile":"Tu perfil","Your profile is not saved:":"Tu perfil no esta guardado:","Your setting is deleted!":"¡Tu configuración esta borrada!","Your setting is not deleted:":"Tu configuración no esta borrada:","Your setting is safe with us!":"¡Tu configuración esta segura con nosotros!","Your user is deleted!":"¡Tu usuario esta borrado!","Your user is not deleted:":"Tu usuario no esta borrado:","dd/MM/yyyy":"dd/MM/aaaa","here":"aquí","image":"imagen","in queue":"en cola"});
    gettextCatalog.setStrings('fr', {"<i class=\"fa fa-arrow-left\"></i> Pages":"<i class=\"fa fa-arrow-left\"></i> Pages","<i class=\"fa fa-arrow-left\"></i> Users":"<i class=\"fa fa-arrow-left\"></i> Utilisateurs","<i class=\"fa fa-save\"></i>  Save":"<i class=\"fa fa-save\"></i>  Enregistrer","<i class=\"fa fa-save\"></i> Save":"<i class=\"fa fa-save\"></i>  Enregistrer","About":"A propos","Actions":"Actions","Add":"Ajouter","Add Category":"Ajoutez une catégorie","Add a new category":"Ajoutez une catégorie","Add a new event":"Ajoutez un évènement","Add a new note":"Ajoutez une note","Add a new post":"Ajoutez un post","Add a new product":"Ajoutez un produit","Add a new setting":"Ajoutez un paramètre","Add product to category":"Ajoutez une produit à la catégorie","Are you sure?":"Êtes vous sûr ?","Body":"Corp","Browse":"Ouvrir","Cancel":"Annuler","Cancel all":"Tout annuler","Categories":"Catégories","Category":"Catégorie","Category deleted":"Catégorie effacée","Category saved":"Catégorie enregistrée","Change it here!":"Modifiez ici!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a event!":"Cliquer <a href=\"\" ui-sref=\"^.add\">ici</a> pour ajouter un évènement!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a note!":"Cliquer <a href=\"\" ui-sref=\"^.add\">ici</a> pour ajouter une note!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a page!":"Cliquer <a href=\"\" ui-sref=\"^.add\">ici</a> pour ajouter une page!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a post!":"Cliquer <a href=\"\" ui-sref=\"^.add\">ici</a> pour ajouter un post!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a setting!":"Cliquer <a href=\"\" ui-sref=\"^.add\">ici</a> pour ajouter un paramètre!","Click <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">here</a> to add a product!":"Cliquer <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">ici</a> pour ajouter un produit!","Click <a href=\"\" ui-sref=\"^.upload\" translate=\"\">here</a> to upload some!":"Cliquer <a href=\"\" ui-sref=\"^.upload\" translate=\"\">ici</a> pour en télécharger!","Confirm Password":"Confirmez le mot de passe","Content":"Contenu","Could not add category!":"La catégorie n'a pu être ajoutée","Could not add event!":"L'évènement n'a pu être ajouté","Could not add note!":"La note n'a pu être ajoutée","Could not add page!":"La page n'a pu être ajoutée","Could not add post!":"Le post n'a pu être ajouté","Could not add product!":"Le produit n'a pu être ajouté","Could not add setting!":"Le paramètre n'a pu être ajouté","Could not add user!":"L'utilisateur n'a pu être ajouté","Create pages with rich content!":"Créez une page avec du contenu riche!","Current user":"Utilisateur courant","Dashboard":"Tableau de bord","Delete category":"Détruire la catégorie","Deleting this cannot be undone":"Cette opération ne peux être annulée","Description":"Description","Don't worry we won't spam your inbox":"Pas de soucis, vous ne recevrez pas de pourriels de notre part.","E-mail":"Adresse courriel","Edit category":"Modifier la catégorie","Edit event":"Modifier l'évènement","Edit note":"Modifier la note","Edit post":"Modifier le post","Edit product":"Modifier le produit","Edit setting":"Modifier le paramètre","Email address needs to be valid":"Votre adresse courriel doit être validé","End":"Fin","End Time":"Heure de fin","Enjoy the new you!":"Votre nouveau compte!","Error deleting category":"La catégorie ne peux être effacée","Error deleting event":"L'évènement ne peux être effacé","Error deleting note":"La note n'a pu être effacée","Error deleting page":"La page ne peux être effacée","Error deleting post":"Le post ne peux être effacé","Error deleting product":"Le produit ne peux être éffacé","Error deleting setting":"Le paramètre ne peut être effacé","Error deleting user":"L'utilisateur ne peux être effacé","Error registering!":"Erreur lors de l'enregistrement du compte","Error saving note":"Erreur lors de l'enregistrement de la note","Error saving profile":"Erreur lors de l'enregistrement du profil","Error saving user:":"Erreur lors de l'enregistrement de l'utilisateur:","Error signin in after registration!":"Erreur de connexion après l'enregistrement!","Event deleted":"Évènement effacé","Event not added":"L'évènement n'a pu être ajouté","Event saved":"Évènement ajouté","Events":"Évènements","File deleted":"Ficher effacé","Files":"Fichiers","First Name":"Prénom","First name":"Prénom","Hello,":"Bonjour,","Home":"Accueil","Key":"Clé","Last Name":"Nom","Last name":"Nom","Logged in":"Connecté","Logged out":"Déconnecté","Manage your events here!":"Gérez vos évènements ici!","Manage your files here!":"Gérez vos fichiers ici!","Manage your notes here!":"Gérez vos notes ici!","Manage your posts here!":"Gérez vos posts ici!","Manage your products here!":"Gérez vos produits ici!","Manage your settings here!":"Gérez vos paramètres ici!","Manager your users here!":"Gérez vos utilisateurs ici!","More info":"Plus d'infos","Name":"Nom","Needs to have at least 4 characters":"Doit avoir au moins 4 caractères","New page":"Nouvelle page","Nice email address!":"Bonne adresse courriel!","Note deleted":"Note effacée","Note saved":"Note enregistrée","Notes":"Notes","Or register":"Ou créez un compte","Or sign in":"Ou connectez-vous","Page deleted":"Page effacée","Page saved":"Page enregistrée","Pages":"Pages","Password":"Mot de passe","Percentage":"Pourcentage","Post deleted":"Post effacé","Post saved":"Post enregistré","Posts":"Post","Price":"Prix","Product":"Produit","Product deleted":"Produit effacé","Product saved":"Produit enregistré","Products":"Produits","Profile":"Profil","Profile saved":"Profil enregistré","Progress":"Progrès","Raw":"Source","Register":"Créez un compte","Registered":"Compte créé","Remove all":"Tout retirer","Roles":"Rôles","Save":"Enregistrer","Setting deleted":"Paramètre effacé","Setting saved":"Paramètre enregistré","Settings":"Paramètres","Sign In":"Connexion","Sign in":"Connexion","Sign out":"Déconnexion","Size":"Grandeur","Start Date":"Date de début","Start Time":"Heure de début","Status":"Status","Stay signed in":"Rester connecté","Submit":"Soumettre","Theme":"Thème","There are no events":"Il n'y a pas d'évènements","There are no files":"Il n'y a pas de fichiers","There are no notes":"Il n'y a pas de notes","There are no pages":"Il n'y a pas de pages","There are no posts":"Il n'y a pas de posts","There are no products in this category!":"Il n'y a pas de produits dans cette catégorie!","There are no settings":"Il n'y a aucun paramètres","This note could no be saved:":"La note n'a pu être enregistrée","This user is save!":"L'utilisateur est enregistré","Title":"Titre","Toggle navigation":"Basculer la navigation","Update profile":"Mise à jour du profil","Upload":"Télécharger","Upload all":"Tout télécharger","Upload files":"Télécharger les fichiers","Upload queue":"File d'attente de téléchargement","User deleted":"L'utilisateur est effacé","User saved":"Utilisateur enregistré","Username":"Code utilisateur","Users":"Utilisateurs","Value":"Valeur","Variables":"Variables","Welcome!":"Bienvenu!","You are logged in!":"Vous êtes connecté","You are logged out!":"Vous êtes déconnecté","You are registered!":"Vous êtes enregistré","You can just drag them in this window!":"Vous pouvez les glisser sur cette fenêtre","You need an email address":"Une adresse courriel est requise","Your Gravatar":"Votre Gravatar","Your category is deleted!":"La catégorie est effacée!","Your category is not deleted:":"La catégorie n'a pu être effacée:","Your category is safe with us!":"La catégorie est enregistrée!","Your event is deleted!":"L'évènement est effacé!","Your event is not deleted:":"L'évènement n'a pu être effacé:","Your event is safe with us!":"L'évènement est enregistré!","Your file is deleted!":"Le fichier est effacé!","Your note is deleted!":"La note est effacée!","Your note is not deleted!":"La note n'a pu être effacée!","Your note is safe with us!":"La note est enregistrée!","Your page is deleted!":"La page est effacée!","Your page is not deleted:":"La page n'a pu être effacée:","Your page is safe with us!":"La page est enregistrée!","Your passwords need to match":"Les mots de passe ne sont pas identiques","Your post is deleted!":"Le post est effacé!","Your post is not deleted:":"Le post n'a pu être effacé:","Your post is safe with us!":"Le post est enregistré!","Your product is deleted!":"Le produit est effacé!","Your product is not deleted:":"Le produit n'a pu être effacé:","Your product is safe with us!":"Le produit est enregistré!","Your profile":"Votre profil","Your profile is not saved:":"Votre profil n'est pas enregistré:","Your setting is deleted!":"Le paramètre est effacé!","Your setting is not deleted:":"Le paramètre n'a pu être effacé:","Your setting is safe with us!":"Le paramètre est effacé!","Your user is deleted!":"L'utilisateur est effacé!","Your user is not deleted:":"L'utilisateur n'a pu être effacé:","dd/MM/yyyy":"dd/MM/yyyy","email":"adresse courriel","here":"ici","image":"image","in queue":"en file"});
    gettextCatalog.setStrings('nl', {"About":"Over","Actions":"Acties","Add":"Toevoegen","Add a new event":"Voeg een evenement toe","Add a new setting":"Voeg een instelling toe","Are you sure?":"Weet u het zeker?","Browse":"Bladeren","Cancel":"Annuleren","Cancel all":"Alles annuleren","Categories":"Categorieën","Category deleted":"Category verwijderd","Category saved":"Category opgeslagen","Change it here!":"Verander het hier!","Confirm Password":"Wachtwoord bevestigen","Could not add event!":"Het evenement kan niet toegevoegd worden","Could not add setting!":"De instelling kan niet toegevoegd worden","Current user":"Huidige gebruiker","Dashboard":"Dashboard","Deleting this cannot be undone":"Het verwijderen kan niet ongedaan gemaakt worden.","Don't worry we won't spam your inbox":"Wees niet bang, we zullen niet je inbox spammen","Edit event":"Evenement wijzigen","Edit setting":"Instelling wijzigen","Email address needs to be valid":"E-mailadres moet geldig zijn","Enjoy the new you!":"Geniet van je nieuwe profiel!","Error deleting category":"Fout bij het verwijderen van de category","Error deleting event":"Fout bij het verwijderen van het evenement","Error deleting page":"Fout bij het verwijderen van de pagina","Error deleting post":"Fout bij het verwijderen van de post","Error deleting product":"Fout bij het verwijderen van het product","Error deleting setting":"Fout bij het verwijderen van de instelling","Error deleting user":"Fout bij het verwijderen van de gebruiker","Error registering!":"Fout bij het registreren","Error saving profile":"Fout bij het opslaan van het profiel","Error saving user:":"Fout bij het opslaan van de gebruiker","Error signin in after registration!":"Fout bij het inloggen na registratie","Event deleted":"Evenement verwijderd","Event not added":"Evenement niet toegevoegd","Event saved":"Evenement opgeslagen","Events":"Evenementen","File deleted":"Bestand verwijderd","Files":"Bestanden","First Name":"Voornaam","Home":"Home","Key":"Sleutel","Last Name":"Achternaam","Logged in":"Ingelogd","Logged out":"Uitgelogd","Manage your events here!":"Hier beheer je je evenementen","Manage your files here!":"Hier beheer je je bestanden","Manage your settings here!":"Hier beheer je je instellingen","Manager your users here!":"Hier beheer je je gebruikers","More info":"Meer informatie","Name":"Naam","Needs to have at least 4 characters":"Moet op z'n minst uit 4 tekens bestaan","Nice email address!":"Mooi e-mailadres!","Notes":"Notities","Or register":"Of registreer","Or sign in":"Of meld je aan","Page deleted":"Pagina verwijderd","Page saved":"Pagina opgeslagen","Pages":"Pagina's","Password":"Wachtwoord","Post deleted":"Post verwijderd","Post saved":"Post opgeslagen","Posts":"Posts","Product deleted":"Product verwijderd","Product saved":"Product opgeslagen","Products":"Producten","Profile":"Profiel","Profile saved":"Profiel opgeslagen","Progress":"Voortgang","Register":"Aanmelden","Registered":"Aangemeld","Remove all":"Alle verwijderen","Setting deleted":"Instelling verwijderd","Setting saved":"Instelling opgeslagen","Settings":"Instellingen","Sign In":"Aanmelden","Sign in":"Aanmelden","Sign out":"Afmelden","Size":"Grootte","Status":"Status","Stay signed in":"Aangemeld blijven","Submit":"Submit","Theme":"Thema","There are no events":"Er zijn geen evenementen","There are no files":"Er zijn geen bestanden","There are no settings":"Er zijn geen instellingen","This user is save!":"Deze gebruiker is opgeslagen","Toggle navigation":"Navigatie wisselen","Update profile":"Profile bijwerken","Upload":"Upload","Upload all":"Alle uploaden","Upload files":"Bestanden uploaden","Upload queue":"Upload wachtrij","User deleted":"Gebruiker verwijderd","User saved":"Gebruiker opgeslagen","Users":"Gebruikers","Value":"Waarde","Variables":"Variabelen","Welcome!":"Welkom!","You are logged in!":"U bent ingelogd!","You are logged out!":"U bent uitgelogd!","You are registered!":"U bent geregistreerd!","You can just drag them in this window!":"U kunt ze gewoon in dit venster slepen!","You need an email address":"U heeft een e-mailadres nodig","Your Gravatar":"Uw Gravatar","Your category is deleted!":"De category is verwijderd","Your category is not deleted:":"De category is niet verwijderd","Your category is safe with us!":"De category is veilig opgeslagen","Your event is deleted!":"Uw evenement is verwijderd ","Your event is not deleted:":"Uw evenement is niet verwijderd:","Your event is safe with us!":"Het evenement is veilig opgeslagen","Your file is deleted!":"Uw bestand is verwijderd","Your page is deleted!":"De pagina is verwijderd","Your page is not deleted:":"De pagina is niet verwijderd","Your page is safe with us!":"De pagina is veilig opgeslagen","Your post is deleted!":"De post is verwijderd","Your post is not deleted:":"De post is niet verwijderd","Your post is safe with us!":"De post is veilig opgeslagen","Your product is deleted!":"Het product is verwijderd","Your product is not deleted:":"Het product is niet verwijderd","Your product is safe with us!":"Het product is veilig opgeslagen","Your profile":"Uw profiel","Your profile is not saved:":"Het profiel is niet opgeslagen","Your setting is deleted!":"Uw instelling is verwijderd","Your setting is not deleted:":"Uw instelling is niet verwijderd","Your setting is safe with us!":"Uw instelling is veilig bij ons!","Your user is deleted!":"De gebruiker is verwijderd","Your user is not deleted:":"De gebruiker is niet verwijderd","here":"hier","in queue":"in de wachtrij"});
    gettextCatalog.setStrings('pt_BR', {"About":"Sobre","Actions":"Ações","Add":"Novo","Add a new event":"Novo Evento","Add a new setting":"Adicionar nova configuração","Are you sure?":"Tem certeza?","Browse":"Navegar","Cancel":"Cancelar","Cancel all":"Cancelar todos","Categories":"Categorias","Category deleted":"Categoria deletada","Category saved":"Categoria atualizada","Change it here!":"Mude Aqui!","Confirm Password":"Confirmar Senha","Could not add event!":"Nenhum evento","Could not add setting!":"Não foi possível criar a configuração","Current user":"Usuário atual","Dashboard":"Painel de Controle","Edit event":"Editar Evento","Edit setting":"Editar configurações","Email address needs to be valid":"﻿Você precisa de um endereço de e-mail válido","Event deleted":"Evento deletado","Events":"Eventos","File deleted":"Arquivo deletado","Files":"Arquivos","First Name":"Nome","Home":"Inicial","Key":"Chave","Last Name":"Sobrenome","Logged in":"Você está logado!","Logged out":"Você não está mais logado!","Manage your events here!":"Administrar seus eventos","Manage your files here!":"Administrar seus arquivos","Manage your settings here!":"Administrar configurações do sistema!","Manager your users here!":"Administrar sua conta","More info":"Mais informações","Name":"Nome","Nice email address!":"﻿Endereço de e-mail legal!","Notes":"Notas","Or register":"Ou Cadastre-se","Or sign in":"Fazer Login","Page deleted":"Página deletada","Page saved":"Página salva","Pages":"Páginas","Password":"Senha","Posts":"Posts","Products":"Produtos","Profile":"Perfil","Progress":"Progresso","Register":"Cadastro","Registered":"Cadastrado","Remove all":"Remover Todos","Settings":"Configurações","Sign In":"Logar","Sign in":"Logar","Sign out":"Sair","Size":"Tamanho","Status":"Status","Stay signed in":"Continuar logado","Submit":"Enviar","Theme":"Tema","There are no events":"Nenhum evento","There are no files":"Nenhum arquivo","There are no settings":"Nenhuma configurações","This user is save!":"Usuário atualizado!","Toggle navigation":"Mudar Navegação","Update profile":"Atualizar Perfil","Upload":"Enviar","Upload all":"Enviar todos","Upload files":"Enviar arquivos","Upload queue":"Fila de envio","User deleted":"Usuário deletado","User saved":"Usuário atualizado","Users":"Usuários","Value":"Valor","Variables":"Variáveis","Welcome!":"Bem vindo!","You are logged in!":"Você está logado!","You are logged out!":"Você não está mais logado!","You are registered!":"Você está cadastrado!","You can just drag them in this window!":"Você pode mover essa janela!","You need an email address":"﻿Você precisa de um endereço de e-mail","Your Gravatar":"Seu gravatar","Your category is deleted!":"Categoria deletada","Your profile":"Seu perfil","here":"arqui","in queue":"na fila"});
    gettextCatalog.setStrings('ru_RU', {"<i class=\"fa fa-arrow-left\"></i> Pages":"<i class=\"fa fa-arrow-left\"></i> Страницы","<i class=\"fa fa-arrow-left\"></i> Users":"<i class=\"fa fa-arrow-left\"></i> Пользователи","<i class=\"fa fa-save\"></i>  Save":"<i class=\"fa fa-save\"></i> Сохранить","<i class=\"fa fa-save\"></i> Save":"<i class=\"fa fa-save\"></i> Сохранить","About":"О нас","Actions":"Действия","Add":"Добавить","Add Category":"Добавить категорию","Add a new category":"Добавить новую категорию","Add a new event":"Добавить новое событие","Add a new note":"Добавить новое примечание","Add a new post":"Добавить новый пост","Add a new product":"Добавить новый продукт","Add a new setting":"Добавьте новый параметр","Add product to category":"Добавить продукт в категории","Are you sure?":"Вы уверены?","Body":"Body","Browse":"Обзор","Cancel":"Отмена","Cancel all":"Отменить все","Categories":"Категории","Category":"Категория","Category deleted":"Категория удалена","Category saved":"Категория сохранена","Change it here!":"Изменить здесь!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a event!":"Нажмите <a href=\"\" ui-sref=\"^.add\">здесь</a> чтобы добавить событие!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a note!":"Нажмите <a href=\"\" ui-sref=\"^.add\">здесь</a> чтобы добавить примечание!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a page!":"Нажмите <a href=\"\" ui-sref=\"^.add\">здесь</a> чтобы добавить страницу!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a post!":"Нажмите <a href=\"\" ui-sref=\"^.add\">здесь</a> чтобы добавить пост!","Click <a href=\"\" ui-sref=\"^.add\">here</a> to add a setting!":"Нажмите <a href=\"\" ui-sref=\"^.add\">здесь</a> чтобы добавить параметр!","Click <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">here</a> to add a product!":"Нажмите <a href=\"\" ui-sref=\"^.add({ categoryId: category.id })\">здесь</a> чтобы добавить продукт!","Click <a href=\"\" ui-sref=\"^.upload\" translate=\"\">here</a> to upload some!":"Нажмите <a href=\"\" ui-sref=\"^.upload\" translate=\"\">здесь</a> чтобы загрузить что-то!","Confirm Password":"Подтвердите Пароль","Content":"Content","Could not add category!":"Не удалось добавить категорию!","Could not add event!":"Не удалось добавить событие!","Could not add note!":"Не удалось добавить примечание!","Could not add page!":"Не удается добавить страницу!","Could not add post!":"Не удалось добавить пост!","Could not add product!":"Не удалось добавить продукт!","Could not add setting!":"Не удалось добавить параметр!","Could not add user!":"Не удалось добавить пользователя!","Create pages with rich content!":"Создание страниц с контентом!","Current user":"Текущий пользователь","Dashboard":"Панель управления","Delete category":"Удалить категорию","Deleting this cannot be undone":"Удаление этого не может быть отменено","Description":"Описание","Don't worry we won't spam your inbox":"Не волнуйтесь, мы не спамим \"Входящие\"","E-mail":"E-mail","Edit category":"Редактирование категории","Edit event":"Редактировать мероприятие","Edit note":"Редактировать примечание","Edit post":"Редактировать пост","Edit product":"Редактировать продукт","Edit setting":"Редактировать параметр","Email address needs to be valid":"Email адрес должен быть действительным","End":"Конец","End Time":"Время окончания","Enjoy the new you!":"Наслаждайтесь новым собой!","Error deleting category":"Ошибка удаления категории","Error deleting event":"Ошибка удаления события","Error deleting note":"Ошибка удаления примечания","Error deleting page":"Ошибка удаления страницы","Error deleting post":"Ошибка удаления поста","Error deleting product":"Ошибка удаления продукта","Error deleting setting":"Ошибка удаления параметра","Error deleting user":"Ошибка удаления пользователя","Error registering!":"Ошибка регистрации!","Error saving note":"Ошибка при сохранении примечания","Error saving profile":"Ошибка при сохранении профиля","Error saving user:":"Ошибка при сохранении пользователя:","Error signin in after registration!":"Ошибка авторизации после регистрации!","Event deleted":"Событие удалено","Event not added":"Событие не добавлено","Event saved":"Событие сохранено","Events":"События","File deleted":"Файл удален","Files":"Файлы","First Name":"Имя","First name":"Имя","Hello,":"Привет,","Home":"Главная","Key":"Key","Last Name":"Фамилия","Last name":"Фамилия","Logged in":"Вошли","Logged out":"Вышел из","Manage your events here!":"Диспетчер ваших событий здесь!","Manage your files here!":"Диспетчер ваших файлов здесь!","Manage your notes here!":"Диспетчер ваших примечаний здесь!","Manage your posts here!":"Диспетчер ваших постов здесь!","Manage your products here!":"Диспетчер ваших продуктов здесь!","Manage your settings here!":"Диспетчер ваших настройек здесь!","Manager your users here!":"Диспетчер ваших пользователей здесь!","More info":"Подробнее","Name":"Name","Needs to have at least 4 characters":"Необходимо иметь по крайней мере 4 символа","New page":"Новая страница","Nice email address!":"Nice email address!","Note deleted":"Примечание удалено","Note saved":"Примечание сохранено","Notes":"Примечания","Or register":"Или зарегистрируйтесь","Or sign in":"Или войдите","Page deleted":"Страница удалена","Page saved":"Страница сохранена","Pages":"Страницы","Password":"Пароль","Percentage":"Процент","Post deleted":"Пост удален","Post saved":"Пост сохранен","Posts":"Посты","Price":"Цена","Product":"Продукт","Product deleted":"Продукт удален","Product saved":"Продукт сохранен","Products":"Продукты","Profile":"Профиль","Profile saved":"Профиль сохранен","Progress":"Ход выполнения","Raw":"Raw","Register":"Регистрация","Registered":"Зарегистрирован(а)","Remove all":"Удалить все","Roles":"Роли","Save":"Сохранить","Setting deleted":"Параметр удален","Setting saved":"Параметр сохранен","Settings":"Настройки","Sign In":"Войти","Sign in":"Войти","Sign out":"Выйти","Size":"Размер","Start Date":"Дата начала","Start Time":"Время начала","Status":"Статус","Stay signed in":"Оставаться авторизованным","Submit":"Отправить","Theme":"Тема","There are no events":"Нет событий","There are no files":"Нет файлов","There are no notes":"Нет примечания","There are no pages":"Нет страниц","There are no posts":"Нет постов","There are no products in this category!":"Нет продуктов в этой категории!","There are no settings":"Не параметров","This note could no be saved:":"Эта примечение не может быть сохранена:","This user is save!":"Этот пользователь сохранен!","Title":"Название","Toggle navigation":"Переключить навигацию","Update profile":"Обновить профиль","Upload":"Загрузить","Upload all":"Загрузить все","Upload files":"Загрузить файлы","Upload queue":"Загрузить очередь","User deleted":"Пользователь удален","User saved":"Пользователь сохранен","Username":"Ваш логин","Users":"Пользователи","Value":"Значение","Variables":"Переменная","Welcome!":"Добро пожаловать!","You are logged in!":"Вы вошли!","You are logged out!":"Вы вышли!","You are registered!":"Вы зарегистрированы!","You can just drag them in this window!":"Вы просто можете перетащить их в это окно!","You need an email address":"Вам нужен email почты","Your Gravatar":"Ваш Gravatar","Your category is deleted!":"Ваша категория удалена!","Your category is not deleted:":"Ваша категория не удалена:","Your category is safe with us!":"Your category is safe with us!","Your event is deleted!":"Ваше событие удалено!","Your event is not deleted:":"Ваше событие не удалено:","Your event is safe with us!":"Your event is safe with us!","Your file is deleted!":"Ваш файл удален!","Your note is deleted!":"Ваше примечание удалено!","Your note is not deleted!":"Ваше примечание не удалено!","Your note is safe with us!":"Your note is safe with us!","Your page is deleted!":"Ваша страница удалена!","Your page is not deleted:":"Ваша страница не удалена:","Your page is safe with us!":"Your page is safe with us!","Your passwords need to match":"Ваши пароли должны совпадать","Your post is deleted!":"Ваш пост удален!","Your post is not deleted:":"Ваш пост не удален:","Your post is safe with us!":"Your post is safe with us!","Your product is deleted!":"Ваш продукт удален!","Your product is not deleted:":"Ваш продукт не удален:","Your product is safe with us!":"Your product is safe with us!","Your profile":"Ваш профиль","Your profile is not saved:":"Ваш профиль не сохранен:","Your setting is deleted!":"Ваш параметр удален!","Your setting is not deleted:":"Ваш параметр не удален:","Your setting is safe with us!":"Your setting is safe with us!","Your user is deleted!":"Ваш пользователь удален!","Your user is not deleted:":"Ваш пользователь не удален:","dd/MM/yyyy":"дд/ММ/гггг","email":"email","here":"здесь","image":"картинка","in queue":"в очереди"});
/* jshint +W100 */
}]);
(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name com.module.about
   * @module
   * @description
   * @requires loopbackApp
   *
   * The `com.module.core` module provides services for interacting with
   * the models exposed by the LoopBack server via the REST API.
   *
   */
  angular.module('com.module.about', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.about')
    .run(["$rootScope", "gettextCatalog", function ($rootScope, gettextCatalog) {
      $rootScope.addDashboardBox(gettextCatalog.getString('About'), 'bg-maroon',
        'ion-information', 0, 'app.about.index');
    }]);
})();

(function () {
  'use strict';
  angular
    .module('com.module.about')
  /**
   * @ngdoc function
   * @name com.module.about.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
    .controller('AboutCtrl', ["$scope", function ($scope) {
      $scope.angular = angular;
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.about')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.about', {
          abstract: true,
          url: '/about',
          templateUrl: 'modules/about/views/main.html'
        })
        .state('app.about.index', {
          url: '',
          templateUrl: 'modules/about/views/about.html',
          controller: 'AboutCtrl'
        });
    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.browser', []);
})();

(function () {
  'use strict';
  angular
    .module('com.module.browser')
    .run(["$rootScope", "Queue", "gettextCatalog", function ($rootScope, Queue, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Browser'), 'app.browser.models', 'fa-globe');
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.browser')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.browser', {
          abstract: true,
          url: '/browser',
          templateUrl: 'modules/browser/views/main.html'
        })
        .state('app.browser.models', {
          url: '',
          templateUrl: 'modules/browser/views/models.html',
          controllerAs: 'ctrl',
          controller: [
            'models',
            function (models) {
              this.models = models;
            }
          ],
          resolve: {
            models: [
              'MetaService',
              function (MetaService) {
                return MetaService.find();
              }
            ]
          }
        })
        .state('app.browser.models.info', {
          url: '/:modelName/info',
          templateUrl: 'modules/browser/views/models.info.html',
          controllerAs: 'info',
          controller: [
            'model',
            function (model) {
              this.model = model;
            }
          ],
          resolve: {
            model: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.findById($stateParams.modelName);
              }
            ]
          }
        })
        .state('app.browser.models.items', {
          url: '/:modelName',
          templateUrl: 'modules/browser/views/models.items.html',
          controllerAs: 'items',
          controller: [
            'model',
            'items',
            function (model, items) {
              this.model = model;
              this.items = items;
              this.itemKeys = [];
              if (this.items[0] !== undefined) {
                this.itemKeys = Object.keys(this.items[0]);
              }
            }
          ],
          resolve: {
            model: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.findById($stateParams.modelName);
              }
            ],
            items: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItems($stateParams.modelName);
              }
            ]
          }
        })
        .state('app.browser.models.items.view', {
          url: '/:modelId/view',
          templateUrl: 'modules/browser/views/models.items.view.html',
          controllerAs: 'view',
          controller: [
            'item',
            function (item) {
              this.item = item;
              this.itemKeys = Object.keys(this.item);
            }
          ],
          resolve: {
            item: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItem($stateParams.modelName, $stateParams.modelId);
              }
            ]
          }
        })
        .state('app.browser.models.items.edit', {
          url: '/:modelId/edit',
          templateUrl: 'modules/browser/views/models.items.edit.html',
          controllerAs: 'edit',
          controller: [
            '$state',
            'MetaService',
            'model',
            'item',
            'itemFields',
            function ($state, MetaService, model, item, itemFields) {
              this.item = item;
              this.itemFields = itemFields;
              this.submit = function () {
                MetaService.upsert(model.name, this.item).then(function () {
                  $state.go('app.browser.models.items', {modelName: model.name}, {reload: true});
                });
              };
            }
          ],
          resolve: {
            item: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItem($stateParams.modelName, $stateParams.modelId);
              }
            ],
            itemFields: [
              '$stateParams',
              'MetaService',
              'model',
              function ($stateParams, MetaService, model) {
                return MetaService.getModelFields(model);
              }
            ]
          }
        })
        .state('app.browser.models.items.add', {
          url: '/add',
          templateUrl: 'modules/browser/views/models.items.add.html',
          controllerAs: 'add',
          controller: [
            '$state',
            'MetaService',
            'model',
            'itemFields',
            function ($state, MetaService, model, itemFields) {
              this.item = {};
              this.itemFields = itemFields;
              this.submit = function () {
                MetaService.upsert(model.name, this.item).then(function () {
                  $state.go('app.browser.models.items', {modelName: model.name}, {reload: true});
                });
              };
            }
          ],
          resolve: {
            itemFields: [
              '$stateParams',
              'MetaService',
              'model',
              function ($stateParams, MetaService, model) {
                return MetaService.getModelFields(model);
              }
            ]
          }
        })
        .state('app.browser.models.items.delete', {
          url: '/:modelId/delete',
          template: '',
          controller: [
            '$state',
            '$stateParams',
            'MetaService',
            'model',
            function ($state, $stateParams, MetaService, model) {
              MetaService.delete(model.name, $stateParams.modelId, function () {
                $state.go('app.browser.models.items', {modelName: model.name}, {reload: true});
              }, function () {
                $state.go('app.browser.models.items', {modelName: model.name}, {reload: true});
              });
            }
          ]
        });
    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name com.module.core
   * @module
   * @description
   * @requires loopbackApp
   *
   * The `com.module.core` module provides services for interacting with
   * the models exposed by the LoopBack server via the REST API.
   *
   */
  angular.module('com.module.core', ['gettext']);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
    .config([
      'cfpLoadingBarProvider',
      function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
      }
    ])
    .run(["$rootScope", "Setting", "gettextCatalog", function ($rootScope, Setting, gettextCatalog) {

      // Left Sidemenu
      $rootScope.menu = [];

      // Add Sidebar Menu
      $rootScope.addMenu = function (name, uisref, icon) {
        $rootScope.menu.push({
          name: name,
          sref: uisref,
          icon: icon
        });
      };

      // Add Menu Dashboard
      $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home',
        'fa-dashboard');

      // Dashboard
      $rootScope.dashboardBox = [];

      // Add Dashboard Box
      $rootScope.addDashboardBox = function (name, color, icon, quantity, href) {
        $rootScope.dashboardBox.push({
          name: name,
          color: color,
          icon: icon,
          quantity: quantity,
          href: href
        });
      };

      // Get Settings for Database
      $rootScope.setSetting = function (key, value) {

        Setting.find({
          filter: {
            where: {
              key: key
            }
          }
        }, function (data) {

          if (data.length) {
            data[0].value = value;
            data[0].$save();
          } else {
            Setting.create({
              key: key,
              value: value
            }, function (data) {
              console.log(data);
            });
          }
          $rootScope.loadSettings();
        });
      };

      // Load Settings blank
      $rootScope.settings = {};

      // Get Settings for Loopback Service
      $rootScope.loadSettings = function () {
        Setting.find(function (settings) {
          $rootScope.settings.data = settings;
        });
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">An error occurred.</div>'
        })
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'modules/core/views/app.html',
          controller: 'MainCtrl'
        })
        .state('app.home', {
          url: '',
          templateUrl: 'modules/core/views/home.html',
          controller: 'HomeCtrl'
        });
      $urlRouterProvider.otherwise('/router');
    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:HomeCtrl
   * @description Dashboard
   * @requires $scope
   * @requires $rootScope
   **/
  angular
    .module('com.module.core')
    .controller('HomeCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
      $scope.count = {};
      $scope.boxes = $rootScope.dashboardBox;
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
  /**
   * @ngdoc function
   * @name com.module.core.controller:LayoutCtrl
   * @description Layout controller
   * @requires $scope
   * @requires $rootScope
   * @requires CoreService
   * @requires gettextCatalog
   **/
    .controller('LayoutCtrl', ["$scope", "$rootScope", "$cookies", "CoreService", "gettextCatalog", function ($scope, $rootScope, $cookies, CoreService, gettextCatalog) {

      // angular translate
      $scope.locale = {
        isopen: false
      };

      $scope.locales = $rootScope.locales;
      $scope.selectLocale = $rootScope.locale;

      $scope.setLocale = function (locale) {
        // set the current lang
        $scope.locale = $scope.locales[locale];
        $scope.selectLocale = $scope.locale;
        $rootScope.locale = $scope.locale;
        $cookies.lang = $scope.locale.lang;

        // You can change the language during runtime
        $scope.locale.isopen = !$scope.locale.isopen;

        gettextCatalog.setCurrentLanguage($scope.locale.lang);
      };

      $scope.appName = 'LoopBack Admin';
      $scope.apiUrl = CoreService.env.apiUrl;
      $scope.appTheme = 'skin-blue';
      $scope.appThemes = [
        {
          'name': 'Black',
          'class': 'skin-black'
        },
        {
          'name': 'Blue',
          'class': 'skin-blue'
        }
      ];
      $scope.appLayout = '';
      $scope.appLayouts = [
        {
          'name': 'Fixed',
          'class': 'fixed'
        },
        {
          'name': 'Scrolling',
          'class': 'not-fixed'
        }
      ];

      $scope.toggleSidebar = function () {
        var $ = angular.element;
        if ($(window).width() <= 992) {
          $('.row-offcanvas').toggleClass('active');
          $('.left-side').removeClass('collapse-left');
          $('.right-side').removeClass('strech');
          $('.row-offcanvas').toggleClass('relative');
        } else {
          // Else, enable content streching
          $('.left-side').toggleClass('collapse-left');
          $('.right-side').toggleClass('strech');
        }
      };

      $scope.settings = $rootScope.settings;

      $rootScope.loadSettings();

    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:MainCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $state

   * @requires CoreService
   * @requires User
   * @requires gettextCatalog
   **/
  angular
    .module('com.module.core')
    .controller('MainCtrl', ["$scope", "$rootScope", "$state", "AppAuth", "CoreService", "User", "gettextCatalog", function ($scope, $rootScope, $state, AppAuth, CoreService, User, gettextCatalog) {
      AppAuth.ensureHasCurrentUser(function () {
        //This call also serves to redirect a user to the login screen, via the interceptor in users.auth.js, if they are not authenticated.
        $scope.currentUser = User.getCurrent();
      });

      $scope.menuoptions = $rootScope.menu;

      $scope.logout = function () {
        AppAuth.logout(function () {
          CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
            gettextCatalog.getString('You are logged out!'));
          $state.go('login');
        });
      };

    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:RouteCtrl
   * @description Redirect for acess
   * @requires $q
   * @requires $scope
   * @requires $state
   * @requires $location
   * @requires AppAuth
   **/
  angular
    .module('com.module.core')
    .controller('RouteCtrl', ["ApiService", "AppAuth", "$location", function (ApiService, AppAuth, $location) {

      ApiService.checkConnection()
        .then(function () {
          console.log('ApiService.checkConnection success');
          if (!AppAuth.currentUser) {
            $location.path('/login');
          } else {
            $location.path('/app');
          }
        })
        .catch(function (err) {
          console.log('ApiService.checkConnection err: ' + err);
          $location.path('/error');
        });

    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:adminBox
   * @description
   * # adminBox
   */
  angular
    .module('com.module.core')
    .directive('adminBox', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink (scope, element) {
          element.text('this is the adminBox directive');
        }
      };
    });

})();

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:adminForm
   * @description
   * # adminForm
   */
  angular
    .module('com.module.core')
    .directive('adminForm', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink (scope, element) {
          element.text('this is the adminForm directive');
        }
      };
    });

})();

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:adminHeader
   * @description
   * @param {string} title Title
   * @param {string} subTitle Subtitle
   * # adminHeader
   */
  angular
    .module('com.module.core')
    .directive('adminHeader', function () {
      return {
        templateUrl: 'modules/core/views/elements/admin-header.html',
        transclude: true,
        scope: {
          title: '@',
          subTitle: '@'
        },
        restrict: 'A'
      };
    });

})();

(function () {
  'use strict';

  angular
    .module('com.module.core')
    .directive('dateButton', function () {
      var linkFn = function link (scope) {
        scope.options.open = false;
        scope.switchOpen = function (event) {
          event.preventDefault();
          event.stopPropagation();
          scope.options.open = true;
          return true;
        };
      };

      return {
        restrict: 'A',
        scope: false,
        compile: function (element) {
          var span = angular.element('<span></span>');
          var button = angular.element('<button></button>');
          var i = angular.element('<i></i>');

          span.addClass('input-group-btn');

          button.attr('type', 'button');
          button.addClass('btn btn-default');
          button.attr('ng-click', 'switchOpen($event)');

          i.addClass('glyphicon glyphicon-calendar');

          button.append(i);
          span.append(button);
          element.after(span);

          return linkFn;
        }
      };
    });

})();

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:home
   * @description
   * # home
   */
  angular
    .module('com.module.core')
    .directive('home', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink (scope, element, attrs) {
          element.text('this is the home directive ' + attrs);
        }
      };
    });

})();

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:navbar
   * @description
   * # navbar
   */
  angular
    .module('com.module.core')
    .directive('navbar', function () {
      return {
        templateUrl: 'modules/core/views/elements/navbar.html',
        restrict: 'E'
      };
    });

})();

(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:smallbBox
   * @restrict E
   * @description Dashboard Box
   * @param {string} name Box Title
   * @param {string} color Admin-Lte bg-color
   * @param {string} icon Ionic-icon class
   * @param {string} quantity Title
   * @param {string} href ui-shref link
   */
  angular
    .module('com.module.core')
    .directive('smallBox', function () {
      return {
        restrict: 'E',
        templateUrl: 'modules/core/views/elements/small-box.html',
        scope: {
          name: '@',
          color: '@',
          icon: '@',
          quantity: '@',
          href: '@'
        }
      };
    });

})();

(function () {
  'use strict';

  angular
    .module('com.module.core')
    .factory('FormHelper', ["$state", "CoreService", "gettextCatalog", function ($state, CoreService, gettextCatalog) {

      return function (model) {

        console.log('This is the model', model);

        this.model = model;

        /**
         * @param {string} id: id of the item that is to be deleted.
         *
         * @description
         * Initiates a delete action. Prompts the user form confirmation
         * before actioning the delete.
         */
        this.delete = function (id) {

          CoreService.confirm(gettextCatalog.getString('Are you sure?'),
            gettextCatalog.getString('Deleting this cannot be undone'),
            function () {
              this.model.deleteById(id, function () {
                CoreService.toastSuccess(gettextCatalog.getString(
                  'Item deleted'), gettextCatalog.getString(
                  'Your item has been deleted!'));
                $state.reload();
              }, function (err) {
                CoreService.toastError(gettextCatalog.getString(
                  'Oops'), gettextCatalog.getString(
                    'Error deleting item: ') + err);
              });
            },
            function () {
              return false;
            });

        };

        /**
         * @param {string} id: name of state to transition to
         *
         * @description
         * Cancel a form action. Sends the user back to the previous page they
         * were on
         */
        this.cancel = function (defaultState) {
          $state.go(defaultState);
        };

      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('ApiService', ["$q", "$http", "ENV", function ($q, $http, ENV) {

      this.checkConnection = function () {
        return $q(function (resolve, reject) {
          $http.get(ENV.apiUrl + '/settings')
            .success(resolve)
            .error(reject);
        });
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('CoreService', ["ENV", "SweetAlert", "toasty", function (ENV, SweetAlert, toasty) {

      this.env = ENV;

      this.alert = function (title, text) {
        SweetAlert.swal(title, text);
      };

      this.alertSuccess = function (title, text) {
        SweetAlert.swal(title, text, 'success');
      };

      this.alertError = function (title, text) {
        SweetAlert.swal(title, text, 'error');
      };

      this.alertWarning = function (title, text) {
        SweetAlert.swal(title, text, 'warning');
      };

      this.alertInfo = function (title, text) {
        SweetAlert.swal(title, text, 'info');
      };

      this.confirm = function (title, text, successCb, cancelCb) {
        var config = {
          title: title,
          text: text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55'
        };
        this._swal(config, successCb, cancelCb);
      };

      this._swal = function (config, successCb, cancelCb) {
        SweetAlert.swal(config,
          function (confirmed) {
            if (confirmed) {
              successCb();
            } else {
              cancelCb();
            }
          });
      };

      this.toastSuccess = function (title, text) {
        toasty.pop.success({
          title: title,
          msg: text,
          sound: false
        });
      };

      this.toastError = function (title, text) {
        toasty.pop.error({
          title: title,
          msg: text,
          sound: false
        });
      };

      this.toastWarning = function (title, text) {
        toasty.pop.warning({
          title: title,
          msg: text,
          sound: false
        });
      };

      this.toastInfo = function (title, text) {
        toasty.pop.info({
          title: title,
          msg: text,
          sound: false
        });
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.core')
    .service('MetaService', ["$injector", "CoreService", "Meta", "gettextCatalog", function ($injector, CoreService, Meta, gettextCatalog) {

      this.find = function () {
        return Meta.getModels().$promise;
      };

      this.findById = function (modelName) {
        return Meta.getModelById({
          name: modelName
        }).$promise;
      };

      this.getModelInstance = function (modelName) {
        return $injector.get(modelName);
      };

      this.getModelItems = function (modelName) {
        var Model = this.getModelInstance(modelName);
        if (typeof Model.find !== 'function') {
          return false;
        } else {
          return Model.find().$promise;
        }
      };

      this.getModelItem = function (modelName, modelId) {
        var Model = this.getModelInstance(modelName);
        if (typeof Model.find !== 'function') {
          return false;
        } else {
          return Model.findOne({
            filter: {
              where: {
                id: modelId
              }
            }
          }).$promise;
        }
      };

      this.getModelFields = function (model) {
        var result = [];
        angular.forEach(model.properties, function (property, propertyName) {
          if (propertyName !== 'id') {
            result.push(getModelField(propertyName, property));
          }
        });
        return result;
      };

      function getModelField (propertyName, property) {
        return {
          key: propertyName,
          type: getModelFieldType(property),
          templateOptions: {
            label: propertyName,
            required: property.required !== undefined ? property.required : false,
            description: property.description !== undefined ? property.description : false
          }
        };
      }

      function getModelFieldType (property) {
        var result = 'input';
        if (property.meta !== undefined && property.meta.formType !== undefined) {
          result = property.meta.formType;
        }
        return result;
      }

      this.upsert = function (modelName, item) {
        var Model = this.getModelInstance(modelName);
        return Model.upsert(item).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Item saved'),
              gettextCatalog.getString('Your item is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving item '),
              gettextCatalog.getString('This item could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (modelName, modelId, successCb, cancelCb) {
        var Model = this.getModelInstance(modelName);

        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Model.deleteById({id: modelId}).$promise.then(function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Item deleted'),
                gettextCatalog.getString('Your item is deleted!'));
              successCb();
            }).catch(function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting item'),
                gettextCatalog.getString('Your item is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.crawlsettings', []);
})();

(function() {
    'use strict';
    angular
        .module('com.module.crawlsettings')
        .run(["$rootScope", "gettextCatalog", "CrawlSetting", function($rootScope, gettextCatalog, CrawlSetting) {
            $rootScope.addMenu(gettextCatalog.getString('Crawler Settings'), 'app.crawlsettings.list', 'fa-cog');
        }]);
})();

(function () {
  'use strict';
  angular
    .module('com.module.crawlsettings')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.crawlsettings', {
          abstract: true,
          url: '/crawlsettings',
          templateUrl: 'modules/crawlsettings/views/main.html',
          controllerAs: 'ctrl',
          controller: ["$rootScope", function($rootScope) {
            this.box = $rootScope.dashboardBox;
          }]
        })
        .state('app.crawlsettings.list', {
          url: '',
          templateUrl: 'modules/crawlsettings/views/list.html',
          controllerAs: 'ctrl',
          controller: ["crawlsettings", function (crawlsettings) {
            this.crawlsettings = crawlsettings;
          }],
          resolve: {
            crawlsettings: ["CrawlSettingService", function (CrawlSettingService) {
              return CrawlSettingService.find();
            }]
          }
        })
        .state('app.crawlsettings.add', {
          url: '/add',
          templateUrl: 'modules/crawlsettings/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "CrawlSettingService", "setting", function ($state, CrawlSettingService, setting) {
            this.setting = setting;
            this.formFields = CrawlSettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CrawlSettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            setting: function () {
              return {};
            }
          }
        })
        .state('app.crawlsettings.launch', {
          url: '/launch',
          templateUrl: 'modules/crawlsettings/views/launch.html',
          controllerAs: 'ctrl',
          controller: ["$state", "CrawlSettingService", "launch", function ($state, CrawlSettingService, launch) {
            this.launch = launch;
            this.launchFormFields = [{
				key: 'name',
				type: 'input',
				templateOptions: {
					label: "Instance Name",
					required: true
				}
			}, {
				key: 'base_url',
				type: 'input',
				templateOptions: {
					label: "Base URL",
					required: true
				}
			}, {
				key: 'rule_route_pattern',
				type: 'textarea',
				templateOptions: {
					label: "Rule Route pattern",
					description: 'http://example.com/page/*',
					required: true
				}
			}, {
				key: 'content_matching_pattern',
				type: 'textarea',
				templateOptions: {
					label: "Content Matching Pattern",
					description: 'http://example.com/page/*',
					required: true
				}
			}];

            this.launchFormOptions = {};
            this.submit = function () {
              CrawlSettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            launch: function () {
              return {};
            }
          }
        })
        .state('app.crawlsettings.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/crawlsettings/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "CrawlSettingService", "crawlsettings", function ($state, CrawlSettingService, crawlsettings) {
            this.crawlsettings = crawlsettings;
            this.formFields = CrawlSettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CrawlSettingService.upsert(this.crawlsettings).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            crawlsettings: ["$stateParams", "CrawlSettingService", function ($stateParams, CrawlSettingService) {
              return CrawlSettingService.findById($stateParams.id);
            }]
          }
        })
        .state('app.crawlsettings.view', {
          url: '/:id',
          templateUrl: 'modules/crawlsettings/views/view.html',
          controllerAs: 'ctrl',
          controller: ["crawlsettings", function (crawlsettings) {
            this.crawlsettings = crawlsettings;
          }],
          resolve: {
            crawlsettings: ["$stateParams", "CrawlSettingService", function ($stateParams, CrawlSettingService) {
              return CrawlSettingService.findById($stateParams.id);
            }]
          }
        })
        .state('app.crawlsettings.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$stateParams", "$state", "CrawlSettingService", function ($stateParams, $state, CrawlSettingService) {
            CrawlSettingService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }]
        });
    }]);

})();

(function() {
	'use strict';
	angular
		.module('com.module.crawlsettings')
		.service('CrawlSettingService', ["$state", "CoreService", "CrawlSetting", "gettextCatalog", function($state, CoreService, CrawlSetting, gettextCatalog) {

			this.find = function() {
				return CrawlSetting.find().$promise;
			};

			this.findById = function(id) {
				return CrawlSetting.findById({
					id: id
				}).$promise;
			};

			this.upsert = function(setting) {
				return CrawlSetting.upsert(setting).$promise
					.then(function() {
						CoreService.toastSuccess(
							gettextCatalog.getString('CrawlSetting saved'),
							gettextCatalog.getString('Your setting is safe with us!')
						);
					})
					.catch(function(err) {
						CoreService.toastError(
							gettextCatalog.getString('Error saving setting '),
							gettextCatalog.getString('This setting could no be saved: ' + err)
						);
					});
			};

			this.delete = function(id, successCb, cancelCb) {
				CoreService.confirm(
					gettextCatalog.getString('Are you sure?'),
					gettextCatalog.getString('Deleting this cannot be undone'),
					function() {
						CrawlSetting.deleteById({
							id: id
						}, function() {
							CoreService.toastSuccess(
								gettextCatalog.getString('CrawlSetting deleted'),
								gettextCatalog.getString('Your setting is deleted!'));
							successCb();
						}, function(err) {
							CoreService.toastError(
								gettextCatalog.getString('Error deleting setting'),
								gettextCatalog.getString('Your setting is not deleted! ') + err);
							cancelCb();
						});
					},
					function() {
						cancelCb();
					}
				);
			};


			this.getFormFields = function() {
				var form = [{
					key: 'key',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('Value'),
						required: true
					}
				}, {
					key: 'value',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('Key'),
						required: true
					}
				}];
				return form;
			};

		}]);

})();

(function () {
  'use strict';
  angular.module('com.module.eventserver', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.eventserver')
    .run(["$rootScope", "gettextCatalog", function ($rootScope, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Event Server'), 'app.eventserver.list', 'fa-book');
    }]);

})();

(function() {
	'use strict';
	angular
		.module('com.module.eventserver')
		.config(["$stateProvider", function($stateProvider) {
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
					controller: ["eventserverService", "ENV", function(eventserverService, ENV) {
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
					}],
					resolve: {
					}
				})
		}]);

})();

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
		.service('eventserverService', ["CoreService", "EventServerRest", "gettextCatalog", function(CoreService, EventServerRest, gettextCatalog) {
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

		}]);

})();

(function () {
  'use strict';
  angular.module('com.module.files', []);
})();

(function () {
  'use strict';
  angular
    .module('com.module.files')
    .run(["$rootScope", "$http", "CoreService", "gettextCatalog", function ($rootScope, $http, CoreService, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Files'), 'app.files.list', 'fa-file');

      $http.get(CoreService.env.apiUrl + '/containers/files/files').success(
        function (data) {
          $rootScope.addDashboardBox(gettextCatalog.getString('Files'), 'bg-blue', 'ion-paperclip', data.length, 'app.files.list');
        });

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.files')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.files', {
          abstract: true,
          url: '/files',
          templateUrl: 'modules/files/views/main.html'
        })
        .state('app.files.list', {
          url: '',
          templateUrl: 'modules/files/views/list.html',
          controllerAs: 'ctrl',
          controller: ["files", function (files) {
            this.files = files.data;
          }],
          resolve: {
            files: ["FileService", function (FileService) {
              return FileService.find();
            }]
          }
        })
        .state('app.files.upload', {
          url: '/upload',
          templateUrl: 'modules/files/views/upload.html',
          controllerAs: 'ctrl',
          controller: ["FileUploader", "CoreService", function (FileUploader, CoreService) {
            this.uploader = new FileUploader({
              url: CoreService.env.apiUrl + '/containers/files/upload',
              formData: [
                {
                  key: 'value'
                }
              ]
            });
          }]
        })
        .state('app.files.delete', {
          url: '/:fileName/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$stateParams", "$state", "FileService", function ($stateParams, $state, FileService) {
            FileService.delete($stateParams.fileName, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }]
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.files')
    .service('FileService', ["$http", "CoreService", "Setting", "gettextCatalog", function ($http, CoreService, Setting, gettextCatalog) {

      this.find = function () {
        return $http.get(CoreService.env.apiUrl + '/containers/files/files').success(function (res) {
          return res.data;
        });
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            $http.delete(CoreService.env.apiUrl +
              '/containers/files/files/' + encodeURIComponent(id)).success(
              function () {
                CoreService.toastSuccess(
                  gettextCatalog.getString('File deleted'),
                  gettextCatalog.getString('Your file is deleted!')
                );
                successCb();
              });
          }, function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error deleting file'),
              gettextCatalog.getString('Your file is not deleted! ') + err);
            cancelCb();
          });
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.notes', []);
})();

(function () {
  'use strict';
  angular
    .module('com.module.notes')
    .run(["$rootScope", "Note", "gettextCatalog", function ($rootScope, Note, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Notes'), 'app.notes.list', 'fa-file-o');

      Note.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Notes'), 'bg-green', 'ion-clipboard', data.length, 'app.notes.list');
      });

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.notes')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.notes', {
          abstract: true,
          url: '/notes',
          templateUrl: 'modules/notes/views/main.html'
        })
        .state('app.notes.list', {
          url: '',
          templateUrl: 'modules/notes/views/list.html',
          controllerAs: 'ctrl',
          controller: ["notes", function (notes) {
            this.notes = notes;
          }],
          resolve: {
            notes: ["NotesService", function (NotesService) {
              return NotesService.getNotes();
            }]
          }
        })
        .state('app.notes.add', {
          url: '/add',
          templateUrl: 'modules/notes/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "NotesService", "note", function ($state, NotesService, note) {
            this.note = note;
            this.formFields = NotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NotesService.upsertNote(this.note).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            note: function () {
              return {};
            }
          }
        })
        .state('app.notes.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/notes/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "NotesService", "note", function ($state, NotesService, note) {
            this.note = note;
            this.formFields = NotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NotesService.upsertNote(this.note).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            note: ["$stateParams", "NotesService", function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }]
          }
        })
        .state('app.notes.view', {
          url: '/:id',
          templateUrl: 'modules/notes/views/view.html',
          controllerAs: 'ctrl',
          controller: ["note", function (note) {
            this.note = note;
          }],
          resolve: {
            note: ["$stateParams", "NotesService", function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }]
          }
        })
        .state('app.notes.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$state", "NotesService", "note", function ($state, NotesService, note) {
            NotesService.deleteNote(note.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }],
          resolve: {
            note: ["$stateParams", "NotesService", function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }]
          }
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.notes')
    .service('NotesService', ["$state", "CoreService", "Note", "gettextCatalog", function ($state, CoreService, Note, gettextCatalog) {

      this.getNotes = function () {
        return Note.find().$promise;
      };

      this.getNote = function (id) {
        return Note.findById({
          id: id
        }).$promise;
      };

      this.upsertNote = function (note) {
        return Note.upsert(note).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Note saved'),
              gettextCatalog.getString('Your note is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving note '),
              gettextCatalog.getString('This note could no be saved: ') + err
            );
          }
        );
      };

      this.deleteNote = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Note.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Note deleted'),
                gettextCatalog.getString('Your note is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting note'),
                gettextCatalog.getString('Your note is not deleted! ') + err);
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
            key: 'body',
            type: 'textarea',
            templateOptions: {
              label: gettextCatalog.getString('Body'),
              required: true
            }
          }
        ];
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.pages', []);

})();

(function () {
  'use strict';
  angular.module('com.module.pages')
    .run(["$rootScope", "Page", "gettextCatalog", function ($rootScope, Page, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Pages'), 'app.pages.list', 'fa-file-o');

      Page.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Pages'), 'bg-teal', 'ion-document-text', data.length, 'app.pages.list');
      });

    }]);

})();

(function () {
  'use strict';

  angular
    .module('com.module.pages')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.pages', {
          abstract: true,
          url: '/pages',
          templateUrl: 'modules/pages/views/main.html'
        })
        .state('app.pages.list', {
          url: '',
          templateUrl: 'modules/pages/views/list.html',
          controllerAs: 'ctrl',
          controller: ["pages", function (pages) {
            this.pages = pages;
          }],
          resolve: {
            pages: ["PageService", function (PageService) {
              return PageService.find();
            }]
          }
        })
        .state('app.pages.add', {
          url: '/add',
          templateUrl: 'modules/pages/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "PageService", "page", function ($state, PageService, page) {
            this.editorOptions = {
              theme: 'monokai',
              lineWrapping: true,
              lineNumbers: true,
              mode: 'markdown'
            };
            this.page = page;
            this.formFields = PageService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PageService.upsert(this.page).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            page: function () {
              return {
                content: '# Hi!\n\n## This is a markdown editor.\n\n    fine code goes here \n\n- lists \n- go \n- here ' +
                '\n\n*Find* **more information** about `markdown` [Here](https://daringfireball.net/projects/markdown/basics)!'
              };
            }
          }
        })
        .state('app.pages.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/pages/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "PageService", "page", function ($state, PageService, page) {
            this.editorOptions = {
              theme: 'monokai',
              lineWrapping: true,
              lineNumbers: true,
              mode: 'markdown'
            };
            this.page = page;
            this.formFields = PageService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              PageService.upsert(this.page).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            page: ["$stateParams", "PageService", function ($stateParams, PageService) {
              return PageService.findById($stateParams.id);
            }]
          }
        })
        .state('app.pages.view', {
          url: '/:id',
          templateUrl: 'modules/pages/views/view.html',
          controllerAs: 'ctrl',
          controller: ["page", function (page) {
            this.page = page;
          }],
          resolve: {
            page: ["$stateParams", "PageService", function ($stateParams, PageService) {
              return PageService.findById($stateParams.id);
            }]
          }
        })
        .state('app.pages.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$stateParams", "$state", "PageService", function ($stateParams, $state, PageService) {
            PageService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }]
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.pages')
    .service('PageService', ["$state", "CoreService", "Page", "gettextCatalog", function ($state, CoreService, Page, gettextCatalog) {

      this.find = function () {
        return Page.find().$promise;
      };

      this.findById = function (id) {
        return Page.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (page) {
        return Page.upsert(page).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Page saved'),
              gettextCatalog.getString('Your page is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving page '),
              gettextCatalog.getString('This page could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Page.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Page deleted'),
                gettextCatalog.getString('Your page is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting page'),
                gettextCatalog.getString('Your page is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function () {
        var form = [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'slug',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Slug'),
              required: true
            }
          }
        ];
        return form;
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.posts', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .run(["$rootScope", "Post", "gettextCatalog", function ($rootScope, Post, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Posts'), 'app.posts.list', 'fa-edit');
    }]);

})();

(function() {
    'use strict';
    angular
        .module('com.module.posts')
        .config(["$stateProvider", function($stateProvider) {
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
                    controller: ["posts", "PostsService", function(posts, PostsService) {
                        this.posts = posts;
                        this.autohidepost = true;

                        this.setLabel = function(post, label) {
                            post.label = label;
                            console.log("Assign " + label + " for ", post);
                            PostsService.setLabel(post);
                            if (this.autohidepost == true) {
                                // Hide
                            }
                        }
                    }],
                    resolve: {
                        posts: [
                            'PostsService',
                            function(PostsService) {
                                return PostsService.getPosts();
                            }
                        ]
                    }
                })
                .state('app.posts.add', {
                    url: '/add',
                    templateUrl: 'modules/posts/views/form.html',
                    controllerAs: 'ctrl',
                    controller: ["$state", "PostsService", "post", function($state, PostsService, post) {
                        this.post = post;
                        this.formFields = PostsService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            PostsService.upsertPost(this.post).then(function() {
                                $state.go('^.list');
                            });
                        };
                    }],
                    resolve: {
                        post: function() {
                            return {};
                        }
                    }
                })
                .state('app.posts.edit', {
                    url: '/:id/edit',
                    templateUrl: 'modules/posts/views/form.html',
                    controllerAs: 'ctrl',
                    controller: ["$state", "PostsService", "post", function($state, PostsService, post) {
                        console.log(post);
                        this.post = post;
                        this.formFields = PostsService.getFormFields();
                        this.formOptions = {};
                        this.submit = function() {
                            PostsService.upsertPost(this.post).then(function() {
                                $state.go('^.list');
                            });
                        };
                    }],
                    resolve: {
                        post: ["$stateParams", "PostsService", function($stateParams, PostsService) {
                            return PostsService.getPost($stateParams.id);
                        }]
                    }
                })
                .state('app.posts.view', {
                    url: '/:id',
                    templateUrl: 'modules/posts/views/view.html',
                    controllerAs: 'ctrl',
                    controller: ["post", function(post) {
                        this.post = post;
                    }],
                    resolve: {
                        post: ["$stateParams", "PostsService", function($stateParams, PostsService) {
                            return PostsService.getPost($stateParams.id);
                        }]
                    }
                })
                .state('app.posts.delete', {
                    url: '/:id/delete',
                    template: '',
                    controllerAs: 'ctrl',
                    controller: ["$state", "PostsService", "post", function($state, PostsService, post) {
                        PostsService.deletePost(post.id, function() {
                            $state.go('^.list');
                        }, function() {
                            $state.go('^.list');
                        });
                    }],
                    resolve: {
                        post: ["$stateParams", "PostsService", function($stateParams, PostsService) {
                            return PostsService.getPost($stateParams.id);
                        }]
                    }
                });
        }]);

})();

(function() {
	'use strict';
	angular
		.module('com.module.posts')
		.service('PostsService', ["CoreService", "Post", "gettextCatalog", function(CoreService, Post, gettextCatalog) {
			this.getPosts = function() {
				return Post.find({
					filter: {
						limit: 100, // Limit 100
						order: 'created DESC',
						where: {
						//	label: 'none'
						}
					}
				}).$promise;
			};

			this.getPost = function(id) {
				return Post.findById({
					id: id
				}).$promise;
			};

			this.upsertPost = function(post) {
				return Post.upsert(post).$promise
					.then(function() {
						CoreService.toastSuccess(
							gettextCatalog.getString('Post saved'),
							gettextCatalog.getString('Your post is safe with us!')
						);
					})
					.catch(function(err) {
						CoreService.toastSuccess(
							gettextCatalog.getString('Error saving post '),
							gettextCatalog.getString('This post could no be saved: ') + err
						);
					});
			};

			this.setLabel = function(post) {
				return Post.upsert(post).$promise
					.then(function() {
						CoreService.toastSuccess(
							gettextCatalog.getString('Assign label "'+ post.label +'" success')
						);
					})
					.catch(function(err) {
						CoreService.toastSuccess(
							gettextCatalog.getString('Error saving post ')
						);
					});
			};

			this.deletePost = function(id, successCb, cancelCb) {
				CoreService.confirm(
					gettextCatalog.getString('Are you sure?'),
					gettextCatalog.getString('Deleting this cannot be undone'),
					function() {
						Post.deleteById({
							id: id
						}, function() {
							CoreService.toastSuccess(
								gettextCatalog.getString('Post deleted'),
								gettextCatalog.getString('Your post is deleted!'));
							successCb();
						}, function(err) {
							CoreService.toastError(
								gettextCatalog.getString('Error deleting post'),
								gettextCatalog.getString('Your post is not deleted! ') + err);
							cancelCb();
						});
					},
					function() {
						cancelCb();
					}
				);
			};

			this.getFormFields = function() {
				return [{
					key: 'url',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('URL'),
						required: true
					}
				}, {
					key: 'title',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('title')
					}
				}, {
					key: 'content',
					type: 'textarea',
					templateOptions: {
						label: gettextCatalog.getString('Content'),
						required: true
					}
				}, {
					key: 'product',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('product')
					}
				}, {
					key: 'source',
					type: 'input',
					templateOptions: {
						label: gettextCatalog.getString('source')
					}
				}, {
					key: 'commentDate',
					type: 'datepicker',
					templateOptions: {
						label: gettextCatalog.getString('commentDate')
					}
				}, {
					key: 'crawlDate',
					type: 'datepicker',
					templateOptions: {
						label: gettextCatalog.getString('crawlDate')
					}
				}, ];
			};

		}]);

})();

(function () {
  'use strict';
  angular.module('com.module.products', []);
})();

(function () {
  'use strict';
  angular
    .module('com.module.products')
    .run(["$rootScope", "Product", "Category", "gettextCatalog", function ($rootScope, Product, Category, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Products'), 'app.products.list', 'fa-file');

      Product.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Products'), 'bg-yellow', 'ion-ios7-cart-outline', data.length, 'app.products.list');
      });

      Category.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Categories'), 'bg-aqua', 'ion-ios7-pricetag-outline', data.length, 'app.products.list');
      });

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.products')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.products', {
          abstract: true,
          url: '/products',
          templateUrl: 'modules/products/views/main.html'
        })
        .state('app.products.list', {
          url: '',
          templateUrl: 'modules/products/views/list.html',
          controllerAs: 'ctrl',
          controller: ["categories", function (categories) {
            this.categories = categories;
          }],
          resolve: {
            categories: [
              'CategoriesService',
              function (CategoriesService) {
                return CategoriesService.getCategories();
              }
            ]
          }
        })
        .state('app.products.add', {
          url: '/add/:categoryId',
          templateUrl: 'modules/products/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "ProductsService", "categories", "product", function ($state, ProductsService, categories, product) {
            this.categories = categories;
            this.product = product;
            this.formFields = ProductsService.getFormFields(categories);
            this.formOptions = {};
            this.submit = function () {
              ProductsService.upsertProduct(this.product).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            categories: ["CategoriesService", function (CategoriesService) {
              return CategoriesService.getCategories();
            }],
            product: ["$stateParams", function ($stateParams) {
              return {
                categoryId: $stateParams.categoryId
              };
            }]
          }
        })
        .state('app.products.edit', {
          url: '/:productId/edit',
          templateUrl: 'modules/products/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "ProductsService", "categories", "product", function ($state, ProductsService, categories, product) {
            this.categories = categories;
            this.product = product;
            this.formFields = ProductsService.getFormFields(categories);
            this.formOptions = {};
            this.submit = function () {
              ProductsService.upsertProduct(this.product).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            categories: ["CategoriesService", function (CategoriesService) {
              return CategoriesService.getCategories();
            }],
            product: ["$stateParams", "ProductsService", function ($stateParams, ProductsService) {
              return ProductsService.getProduct($stateParams.productId);
            }]
          }
        })
        .state('app.products.addcategory', {
          url: '/addcategory',
          templateUrl: 'modules/products/views/categoryform.html',
          controllerAs: 'ctrl',
          controller: ["$state", "CategoriesService", "category", function ($state, CategoriesService, category) {
            this.category = category;
            this.formFields = CategoriesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CategoriesService.upsertCategory(this.category).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            category: function () {
              return {};
            }
          }
        })
        .state('app.products.view', {
          url: '/:productId',
          templateUrl: 'modules/products/views/view.html',
          controllerAs: 'ctrl',
          controller: ["product", function (product) {
            this.product = product;
            console.log(product);
          }],
          resolve: {
            product: ["$stateParams", "ProductsService", function ($stateParams, ProductsService) {
              return ProductsService.getProduct($stateParams.productId);
            }]
          }
        })
        .state('app.products.editcategory', {
          url: '/editcategory/:categoryId',
          templateUrl: 'modules/products/views/categoryform.html',
          controllerAs: 'ctrl',
          controller: ["$state", "CategoriesService", "category", function ($state, CategoriesService, category) {
            this.category = category;
            this.formFields = CategoriesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              CategoriesService.upsertCategory(this.category).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            category: ["$stateParams", "CategoriesService", function ($stateParams, CategoriesService) {
              return CategoriesService.getCategory($stateParams.categoryId);
            }]
          }
        })
        .state('app.products.deletecategory', {
          url: '/category/:categoryId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$state", "CategoriesService", "product", function ($state, CategoriesService, product) {
            CategoriesService.deleteCategory(product.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }],
          resolve: {
            product: ["$stateParams", "CategoriesService", function ($stateParams, CategoriesService) {
              return CategoriesService.getCategory($stateParams.categoryId);
            }]
          }
        })
        .state('app.products.delete', {
          url: '/:productId/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$state", "ProductsService", "product", function ($state, ProductsService, product) {
            ProductsService.deleteProduct(product.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }],
          resolve: {
            product: ["$stateParams", "ProductsService", function ($stateParams, ProductsService) {
              return ProductsService.getProduct($stateParams.productId);
            }]
          }
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.products')
    .service('CategoriesService', ["CoreService", "Category", "gettextCatalog", function (CoreService, Category, gettextCatalog) {

      this.getCategories = function () {
        return Category.find({
          filter: {
            order: 'created DESC',
            include: [
              'products'
            ]
          }
        }).$promise;
      };

      this.getCategory = function (id) {
        return Category.findOne({
          where: {
            id: id
          }
        }).$promise;
      };

      this.upsertCategory = function (category) {
        return Category.upsert(category).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Category saved'),
              gettextCatalog.getString('Your category is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving category '),
              gettextCatalog.getString('This category could no be saved: ') + err
            );
          }
        );
      };

      this.deleteCategory = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Category.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Category deleted'),
                gettextCatalog.getString('Your category is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting category'),
                gettextCatalog.getString('Your category is not deleted! ') + err);
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
          }
        ];
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.products')
    .service('ProductsService', ["CoreService", "Product", "gettextCatalog", function (CoreService, Product, gettextCatalog) {

      this.getProducts = function () {
        return Product.find({
          filter: {
            order: 'created DESC'
          }
        }).$promise;
      };

      this.getProduct = function (id) {
        return Product.findById({
          id: id
        }).$promise;
      };

      this.upsertProduct = function (product) {
        return Product.upsert(product).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Product saved'),
              gettextCatalog.getString('Your product is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastSuccess(
              gettextCatalog.getString('Error saving product '),
              gettextCatalog.getString('This product could no be saved: ') + err
            );
          }
        );
      };

      this.deleteProduct = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Product.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Product deleted'),
                gettextCatalog.getString('Your product is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting product'),
                gettextCatalog.getString('Your product is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function (categories) {
        var catOptions = categories.map(function (category) {
          return {
            name: category.name,
            value: category.id
          };
        });
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
            key: 'categoryId',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Category'),
              required: true,
              options: catOptions
            }
          },
          {
            key: 'description',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Description')
            }
          },
          {
            key: 'price',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Price')
            }
          }
        ];
      };
    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.queues', []);
})();

(function () {
  'use strict';
  angular.module('com.module.queues', []);
})();

(function() {
	'use strict';
	angular
		.module('com.module.queues')
		.run(["$rootScope", "Queue", "gettextCatalog", function($rootScope, Queue, gettextCatalog) {
			$rootScope.addMenu(gettextCatalog.getString('Queues'), 'app.queues.list', 'fa-calendar-o');

			Queue.find(function(data) {
				$rootScope.addDashboardBox('Queues', 'bg-purple', 'ion-calendar', data.length, 'app.queues.list');
			});
		}]);
})();

(function() {
	'use strict';
	angular
		.module('com.module.queues')
		.config(["$stateProvider", function($stateProvider) {
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
					controller: ["queues", function(queues) {
						this.queues = queues;
					}],
					resolve: {
						queues: ["QueuesService", function(QueuesService) {
							return QueuesService.getQueues();
						}]
					}
				})
				.state('app.queues.add', {
					url: '/add',
					templateUrl: 'modules/queues/views/form.html',
					controllerAs: 'ctrl',
					controller: ["$state", "QueuesService", "queue", function($state, QueuesService, queue) {
						this.queue = queue;
						this.formFields = QueuesService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							QueuesService.upsertQueue(this.queue).then(function() {
								$state.go('^.list');
							});
						};
					}],
					resolve: {
						queue: function() {
							return {};
						}
					}
				})
				.state('app.queues.edit', {
					url: '/:id/edit',
					templateUrl: 'modules/queues/views/form.html',
					controllerAs: 'ctrl',
					controller: ["$state", "QueuesService", "queue", function($state, QueuesService, queue) {
						console.log(queue);
						this.queue = queue;
						this.formFields = QueuesService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							QueuesService.upsertQueue(this.queue).then(function() {
								$state.go('^.list');
							});
						};
					}],
					resolve: {
						queue: ["$stateParams", "QueuesService", function($stateParams, QueuesService) {
							return QueuesService.getQueue($stateParams.id);
						}]
					}
				})
				.state('app.queues.view', {
					url: '/:id',
					templateUrl: 'modules/queues/views/view.html',
					controllerAs: 'ctrl',
					controller: ["queue", function(queue) {
						this.queue = queue;
					}],
					resolve: {
						queue: ["$stateParams", "QueuesService", function($stateParams, QueuesService) {
							return QueuesService.getQueue($stateParams.id);
						}]
					}
				})
				.state('app.queues.delete', {
					url: '/:id/delete',
					template: '',
					controllerAs: 'ctrl',
					controller: ["$state", "QueuesService", "queue", function($state, QueuesService, queue) {
						QueuesService.deleteQueue(queue.id, function() {
							$state.go('^.list');
						}, function() {
							$state.go('^.list');
						});
					}],
					resolve: {
						queue: ["$stateParams", "QueuesService", function($stateParams, QueuesService) {
							return QueuesService.getQueue($stateParams.id);
						}]
					}
				})
				.state('app.queues.status', {
					url: '/status',
					templateUrl: 'modules/queues/views/status.html',
					controllerAs: 'ctrl',
					controller: ["$state", function($state) {

					}],
					resolve: {
						queue: function() {
							return {};
						}
					}
				});
		}]);
})();

(function () {
  'use strict';
  angular
    .module('com.module.queues')
    .service('QueuesService', ["$state", "CoreService", "Queue", "gettextCatalog", function ($state, CoreService, Queue, gettextCatalog) {

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

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.sandbox', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .run(["$rootScope", function ($rootScope) {
      $rootScope.addMenu('Sandbox', 'app.sandbox.index', 'fa-inbox');
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.sandbox', {
          abstract: true,
          url: '/sandbox',
          templateUrl: 'modules/sandbox/views/main.html',
          controller: 'SandboxCtrl'
        })
        .state('app.sandbox.index', {
          url: '',
          controller: ["$state", function ($state) {
            $state.go('app.sandbox.autofields');
          }]
        })
        .state('app.sandbox.schemaform', {
          url: '/schemaform',
          templateUrl: 'modules/sandbox/views/schemaform.html',
          controller: 'SandboxSchemaformCtrl',
          controllerAs: 'ctrl'
        })
        .state('app.sandbox.forms', {
          url: '/forms',
          templateUrl: 'modules/sandbox/views/forms.html',
          controller: 'SandboxFormsCtrl'
        })
        .state('app.sandbox.icons', {
          url: '/icons',
          templateUrl: 'modules/sandbox/views/icons.html',
          controller: 'SandboxIconsCtrl'
        })
        .state('app.sandbox.faker', {
          url: '/faker',
          templateUrl: 'modules/sandbox/views/faker.html',
          controller: 'SandboxFakerCtrl'
        })
        .state('app.sandbox.coreservice', {
          url: '/coreservice',
          templateUrl: 'modules/sandbox/views/coreservice.html',
          controller: 'SandboxCoreServiceCtrl'
        })
        .state('app.sandbox.bootstrap', {
          url: '/bootstrap',
          templateUrl: 'modules/sandbox/views/bootstrap.html'
        })
        .state('app.sandbox.trees', {
          url: '/trees',
          templateUrl: 'modules/sandbox/views/trees.html',
          controller: 'SandboxTreesCtrl'
        })
        .state('app.sandbox.users', {
          url: '/users',
          template: '<pre>{{users | json}}</pre>',
          controller: ["$scope", "User", function ($scope, User) {
            $scope.users = User.find({}, function (err, data) {
              console.log(data);
              return;
            });
          }]
        })
        .state('app.sandbox.dashboard', {
          url: '',
          templateUrl: 'modules/sandbox/views/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('app.sandbox.grid', {
          url: '/grid',
          templateUrl: 'modules/sandbox/views/grid.html',
          controller: 'SandboxGridCtrl'
        })
        .state('app.sandbox.autofields', {
          url: '/autofields',
          templateUrl: 'modules/sandbox/views/autofields.html',
          controller: 'AutoFieldsCtrl'
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('AutoFieldsCtrl', ["$scope", "$state", "$log", function ($scope, $state, $log) {

      $scope.user = {
        username: '',
        email: 'test@test.com',
        gender: null,
        genderCheck: null,
        bio: '',
        website: '',
        number: 1,
        birthdate: new Date(),
        password: '',
        confirmPassword: '',
        rememberMe: false
      };

      $scope.schema = [{
        property: 'username',
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: 'Needs to have at least 4 characters'
        }
      }, {
        property: 'email',
        type: 'email',
        help: 'Don\'t worry we won\'t spam your inbox',
        attr: {
          required: true,
          ngMinlength: 4
        },
        msgs: {
          required: 'You need an email address',
          email: 'Email address needs to be valid',
          valid: 'Nice email address!'
        }
      }, {
        property: 'website',
        type: 'url',
        msgs: {
          url: 'You need a valid url'
        }
      }, {
        property: 'number',
        label: 'Number between 1-10',
        type: 'number',
        attr: {
          min: 1,
          max: 10
        },
        msgs: {
          min: 'You need a number no less than 1',
          max: 'You need a number no greater than 10'
        },
        validate: false
      }, {
        property: 'birthdate',
        type: 'date',
        attr: {
          required: true
        }
      }, {
        property: 'gender',
        type: 'select',
        list: 'key as value for (key,value) in genders',
        attr: {
          required: true
        }
      }, {
        property: 'genderCheck',
        label: 'Are you really?',
        type: 'select',
        list: 'key as value for (key,value) in genderCheck',
        attr: {
          required: true,
          ngShow: '$data.gender != null'
        }
      }, {
        property: 'bio',
        type: 'textarea',
        rows: 5,
        placeholder: 'A bit about yourself...',
        attr: {
          required: true
        }
      }, {
        type: 'multiple',
        fields: [{
          property: 'password',
          type: 'password',
          attr: {
            required: true,
            ngMinlength: 6
          }
        }, {
          property: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          attr: {
            confirmPassword: 'user.password',
            required: true,
            ngMinlength: 6
          },
          msgs: {
            match: 'Your passwords need to match'
          }
        }],
        columns: 6
      }, {
        property: 'rememberMe',
        label: 'Stay signed in',
        type: 'checkbox'
      }];

      $scope.options = {
        validation: {
          enabled: true,
          showMessages: false
        },
        layout: {
          type: 'basic',
          labelSize: 3,
          inputSize: 9
        }
      };

      $scope.genders = {
        0: 'Male',
        1: 'Female'
      };

      $scope.genderCheck = {
        0: 'No',
        1: 'Yes'
      };

      $scope.toggleValidation = function () {
        $scope.options.validation.enabled = !$scope.options.validation.enabled;
      };

      $scope.togglePopovers = function () {
        $scope.options.validation.showMessages = !$scope.options.validation.showMessages;
      };


      $scope.toggleHorizontal = function () {
        $scope.options.layout.type = $scope.options.layout.type ===
        'horizontal' ? 'basic' : 'horizontal';
      };

      $scope.addField = function () {
        $scope.schema.push({
          property: 'new' + (new Date().getTime()),
          label: 'New Field'
        });
      };

      $scope.join = function () {
        if (!$scope.joinForm.$valid) {
          return;
        }
        //join stuff....
        $log.info($scope.user);
        console.log('You\'ve joined!\n\nSee console for additional info.');
      };
    }])
    .directive('confirmPassword', [
      function () {
        return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attrs, ngModel) {
            var validate = function (viewValue) {
              var password = scope.$eval(attrs.confirmPassword);
              ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
                viewValue === password);
              return viewValue;
            };
            ngModel.$parsers.push(validate);
            scope.$watch(attrs.confirmPassword, function () {
              validate(ngModel.$viewValue);
            });
          }
        };
      }
    ]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxBootstrapAlertCtrl', ["$scope", function ($scope) {
      $scope.alerts = [{
        type: 'danger',
        msg: 'Oh snap! Change a few things up and try submitting again.'
      }, {
        type: 'success',
        msg: 'Well done! You successfully read this important alert message.'
      }];

      $scope.addAlert = function () {
        $scope.alerts.push({
          msg: 'Another alert!'
        });
      };

      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxBootstrapTabsCtrl', ["$scope", "CoreService", function ($scope, CoreService) {
      $scope.tabs = [{
        title: 'Dynamic Title 1',
        content: 'Dynamic content 1'
      }, {
        title: 'Dynamic Title 2',
        content: 'Dynamic content 2',
        disabled: true
      }];

      $scope.alertMe = function () {
        CoreService.alert('You\'ve selected the alert tab!');
      };
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxCoreServiceCtrl', ["$scope", "$timeout", "CoreService", function ($scope, $timeout, CoreService) {

      $scope.basicAlert = function () {
        CoreService.alert('This is the most basic alert!');
      };

      $scope.basicAlertBody = function () {
        CoreService.alert('This is the most basic alert!',
          'I am the alert text!');
      };

      $scope.basicAlertSuccess = function () {
        CoreService.alertSuccess('This is a success alert!',
          'I am the success text!');
      };

      $scope.basicAlertError = function () {
        CoreService.alertError('This is a error alert!',
          'I am the error text!');
      };

      $scope.basicAlertWarning = function () {
        CoreService.alertWarning('This is a warning alert!',
          'I am the warning text!');
      };

      $scope.basicAlertInfo = function () {
        CoreService.alertInfo('This is a info alert!', 'I am the info text!');
      };

      $scope.basicConfirm = function () {
        CoreService.confirm('This is an agreement', 'So do you agree?',
          function () {
            CoreService.alert('You agree!');
          },
          function () {
            CoreService.alert('You don\'t agree!');
          });
      };

      $scope.toasty = {
        title: 'Notify me!',
        text: 'This is the body!'
      };

      $scope.toastSuccess = function () {
        CoreService.toastSuccess($scope.toasty.title, $scope.toasty.text);
      };

      $scope.toastError = function () {
        CoreService.toastError($scope.toasty.title, $scope.toasty.text);
      };

      $scope.toastWarning = function () {
        CoreService.toastWarning($scope.toasty.title, $scope.toasty.text);
      };

      $scope.toastInfo = function () {
        CoreService.toastInfo($scope.toasty.title, $scope.toasty.text);
      };

      $scope.toastAll = function () {
        CoreService.toastSuccess($scope.toasty.title, $scope.toasty.text);
        CoreService.toastError($scope.toasty.title, $scope.toasty.text);
        CoreService.toastWarning($scope.toasty.title, $scope.toasty.text);
        CoreService.toastInfo($scope.toasty.title, $scope.toasty.text);
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxCtrl', ["$scope", function ($scope) {
      $scope.items = [{
        name: 'CoreService',
        sref: '.coreservice'
      }, {
        name: 'Autofields',
        sref: '.autofields'
      }, {
        name: 'Bootstrap',
        sref: '.bootstrap'
      }, {
        name: 'Dashboard',
        sref: '.dashboard'
      }, {
        name: 'Schemaform',
        sref: '.schemaform'
      }, {
        name: 'Forms',
        sref: '.forms'
      }, {
        name: 'Faker',
        sref: '.faker'
      }, {
        name: 'Icons',
        sref: '.icons'
      }, {
        name: 'Grid',
        sref: '.grid'
      }, {
        name: 'Trees',
        sref: '.trees'
      }];
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('DashboardCtrl', ["$scope", function ($scope) {

      $scope.boxes = [];

      $scope.addComponent = function (name, color, icon, quantity, href) {
        $scope.boxes.push({
          name: name,
          color: color,
          icon: icon,
          quantity: quantity,
          href: href
        });
      };

      $scope.addComponent('Autofields', 'bg-blue', 'ion-document-text', '1',
        'app.components.autofields');

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('DatepickerDemoCtrl', ["$scope", function ($scope) {
      $scope.today = function () {
        $scope.dt = new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.dt = null;
      };
      $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
      };
      $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
      $scope.formats = [
        'dd-MMMM-yyyy',
        'yyyy/MM/dd',
        'dd.MM.yyyy',
        'shortDate'
      ];
      $scope.format = $scope.formats[0];
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .service('FakeService', ["$window", function ($window) {
      this.faker = $window.faker;
    }])
    .controller('SandboxFakerCtrl', ["$scope", "$window", "CoreService", "FakeService", "Queue", "Post", "User", "Page", "Note", function ($scope, $window, CoreService, FakeService, Queue, Post, User, Page, Note) {
      $scope.faker = [];

      $scope.records = 10;

      console.log(FakeService);

      $scope.fakeUsers = function () {
        $scope.faker = [];
        for (var i = 0; i < $scope.records; i++) {
          var fake = {
            email: FakeService.faker.internet.email(),
            userName: FakeService.faker.internet.userName(),
            firstName: FakeService.faker.name.firstName(),
            lastName: FakeService.faker.name.lastName(),
            password: FakeService.faker.internet.password()
          };
          $scope.faker.push(fake);
          User.create(fake);
        }
        CoreService.toastSuccess('Created ' + $scope.records + ' users');
      };

      $scope.fakePosts = function () {
        $scope.faker = [];
        for (var i = 1; i <= $scope.records; i++) {
          var fake = {
            title: FakeService.faker.lorem.sentence(),
            content: FakeService.faker.lorem.paragraph(),
            image: FakeService.faker.image.imageUrl()
          };
          $scope.faker.push(fake);
          Post.create(fake);
        }
        CoreService.toastSuccess('Created ' + $scope.records + ' posts');
      };

      $scope.fakePages = function () {
        $scope.faker = [];
        for (var i = 1; i <= $scope.records; i++) {
          var fake = {
            name: FakeService.faker.lorem.sentence(),
            content: FakeService.faker.lorem.paragraph()
          };
          $scope.faker.push(fake);
          Page.create(fake);
        }
        CoreService.toastSuccess('Created ' + $scope.records + ' pages');
      };

      $scope.fakeNotes = function () {
        $scope.faker = [];
        for (var i = 1; i <= $scope.records; i++) {
          var fake = {
            title: FakeService.faker.lorem.sentence(),
            body: FakeService.faker.lorem.paragraph()
          };
          $scope.faker.push(fake);
          Note.create(fake);
        }
        CoreService.toastSuccess('Created ' + $scope.records + ' notes');
      };

      $scope.fakeEvents = function () {
        $scope.faker = [];
        for (var i = 0; i < $scope.records; i++) {
          var fake = {
            name: FakeService.faker.lorem.sentence(),
            description: FakeService.faker.lorem.paragraph(),
            startDate: FakeService.faker.date.future(),
            endDate: FakeService.faker.date.future()
          };
          $scope.faker.push(fake);
          Queue.create(fake);
        }
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxFormsCtrl', ["$scope", "CoreService", function ($scope, CoreService) {

      var now = new Date();

      $scope.formOptions = {};

      $scope.formData = {
        name: null,
        description: null,
        startDate: now,
        startTime: now,
        endDate: now,
        endTime: now
      };

      $scope.formFields = [{
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name'
        }
      }, {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Description'
        }
      }, {
        key: 'startDate',
        type: 'datepicker',
        templateOptions: {
          label: 'Start Date'
        }
      }, {
        key: 'startTime',
        type: 'timepicker',
        templateOptions: {
          label: 'Start Time'
        }
      }, {
        key: 'endDate',
        type: 'datepicker',
        templateOptions: {
          label: 'End Date'
        }
      }, {
        key: 'endTime',
        type: 'timepicker',
        templateOptions: {
          label: 'End Time'
        }
      }];

      $scope.onSubmit = function (data) {
        CoreService.alertSuccess('Good job!', JSON.stringify(data, null, 2));
      };
    }]);

})();

(function () {
  'use strict';

  angular
    .module('com.module.sandbox')
    .controller('SandboxGridCtrl', ["$scope", "uiGridConstants", function ($scope, uiGridConstants) {

      $scope.dataset = [];

      var loadData = function () {

        for (var i = 1; i < 10; i++) {
          var newRow = {
            'name': 'Name field ' + i,
            'address': {
              'street': 'Street Col ' + i
            },
            'age': (i * 10),
            'registered': Date.now()
          };
          $scope.dataset.push(newRow);
        }
      };

      loadData();

      $scope.gridOptions = {
        showGridFooter: true,
        showColumnFooter: true,
        enableFiltering: true,
        columnDefs: [
          {
            field: 'name',
            width: '13%'
          },
          {
            field: 'address.street',
            aggregationType: uiGridConstants.aggregationTypes.sum,
            width: '13%'
          },
          {
            field: 'age',
            aggregationType: uiGridConstants.aggregationTypes.avg,
            aggregationHideLabel: true,
            width: '13%'
          },
          {
            name: 'ageMin',
            field: 'age',
            aggregationType: uiGridConstants.aggregationTypes.min,
            width: '13%',
            displayName: 'Age for min'
          },
          {
            name: 'ageMax',
            field: 'age',
            aggregationType: uiGridConstants.aggregationTypes.max,
            width: '13%',
            displayName: 'Age for max'
          },
          {
            name: 'customCellTemplate',
            field: 'age',
            width: '14%',
            footerCellTemplate: '<div class="ui-grid-cell-contents" style="background-color: Red;color: White">custom template</div>'
          },
          {
            name: 'registered',
            field: 'registered',
            width: '20%',
            cellFilter: 'date',
            footerCellFilter: 'date',
            aggregationType: uiGridConstants.aggregationTypes.max
          }
        ],
        data: $scope.dataset,
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
        }
      };

    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxIconsCtrl', ["$scope", function ($scope) {

      $scope.filter = '';

      $scope.iconSets = {
        fontAwesome: {
          baseClass: 'fa fa-fw fa-3x',
          icons: [
            'fa-adjust',
            'fa-adn',
            'fa-align-center',
            'fa-align-justify',
            'fa-align-left',
            'fa-align-right',
            'fa-ambulance',
            'fa-anchor',
            'fa-android',
            'fa-angellist',
            'fa-angle-double-down',
            'fa-angle-double-left',
            'fa-angle-double-right',
            'fa-angle-double-up',
            'fa-angle-down',
            'fa-angle-left',
            'fa-angle-right',
            'fa-angle-up',
            'fa-apple',
            'fa-archive',
            'fa-area-chart',
            'fa-arrow-circle-down',
            'fa-arrow-circle-left',
            'fa-arrow-circle-o-down',
            'fa-arrow-circle-o-left',
            'fa-arrow-circle-o-right',
            'fa-arrow-circle-o-up',
            'fa-arrow-circle-right',
            'fa-arrow-circle-up',
            'fa-arrow-down',
            'fa-arrow-left',
            'fa-arrow-right',
            'fa-arrow-up',
            'fa-arrows',
            'fa-arrows-alt',
            'fa-arrows-h',
            'fa-arrows-v',
            'fa-asterisk',
            'fa-at',
            'fa-automobile',
            'fa-backward',
            'fa-ban',
            'fa-bank',
            'fa-bar-chart',
            'fa-bar-chart-o',
            'fa-barcode',
            'fa-bars',
            'fa-bed',
            'fa-beer',
            'fa-behance',
            'fa-behance-square',
            'fa-bell',
            'fa-bell-o',
            'fa-bell-slash',
            'fa-bell-slash-o',
            'fa-bicycle',
            'fa-binoculars',
            'fa-birthday-cake',
            'fa-bitbucket',
            'fa-bitbucket-square',
            'fa-bitcoin',
            'fa-bold',
            'fa-bolt',
            'fa-bomb',
            'fa-book',
            'fa-bookmark',
            'fa-bookmark-o',
            'fa-briefcase',
            'fa-btc',
            'fa-bug',
            'fa-building',
            'fa-building-o',
            'fa-bullhorn',
            'fa-bullseye',
            'fa-bus',
            'fa-buysellads',
            'fa-cab',
            'fa-calculator',
            'fa-calendar',
            'fa-calendar-o',
            'fa-camera',
            'fa-camera-retro',
            'fa-car',
            'fa-caret-down',
            'fa-caret-left',
            'fa-caret-right',
            'fa-caret-square-o-down',
            'fa-caret-square-o-left',
            'fa-caret-square-o-right',
            'fa-caret-square-o-up',
            'fa-caret-up',
            'fa-cart-arrow-down',
            'fa-cart-plus',
            'fa-cc',
            'fa-cc-amex',
            'fa-cc-discover',
            'fa-cc-mastercard',
            'fa-cc-paypal',
            'fa-cc-stripe',
            'fa-cc-visa',
            'fa-certificate',
            'fa-chain',
            'fa-chain-broken',
            'fa-check',
            'fa-check-circle',
            'fa-check-circle-o',
            'fa-check-square',
            'fa-check-square-o',
            'fa-chevron-circle-down',
            'fa-chevron-circle-left',
            'fa-chevron-circle-right',
            'fa-chevron-circle-up',
            'fa-chevron-down',
            'fa-chevron-left',
            'fa-chevron-right',
            'fa-chevron-up',
            'fa-child',
            'fa-circle',
            'fa-circle-o',
            'fa-circle-o-notch',
            'fa-circle-thin',
            'fa-clipboard',
            'fa-clock-o',
            'fa-close',
            'fa-cloud',
            'fa-cloud-download',
            'fa-cloud-upload',
            'fa-cny',
            'fa-code',
            'fa-code-fork',
            'fa-codepen',
            'fa-coffee',
            'fa-cog',
            'fa-cogs',
            'fa-columns',
            'fa-comment',
            'fa-comment-o',
            'fa-comments',
            'fa-comments-o',
            'fa-compass',
            'fa-compress',
            'fa-connectdevelop',
            'fa-copy',
            'fa-copyright',
            'fa-credit-card',
            'fa-crop',
            'fa-crosshairs',
            'fa-css3',
            'fa-cube',
            'fa-cubes',
            'fa-cut',
            'fa-cutlery',
            'fa-dashboard',
            'fa-dashcube',
            'fa-database',
            'fa-dedent',
            'fa-delicious',
            'fa-desktop',
            'fa-deviantart',
            'fa-diamond',
            'fa-digg',
            'fa-dollar',
            'fa-dot-circle-o',
            'fa-download',
            'fa-dribbble',
            'fa-dropbox',
            'fa-drupal',
            'fa-edit',
            'fa-eject',
            'fa-ellipsis-h',
            'fa-ellipsis-v',
            'fa-empire',
            'fa-envelope',
            'fa-envelope-o',
            'fa-envelope-square',
            'fa-eraser',
            'fa-eur',
            'fa-euro',
            'fa-exchange',
            'fa-exclamation',
            'fa-exclamation-circle',
            'fa-exclamation-triangle',
            'fa-expand',
            'fa-external-link',
            'fa-external-link-square',
            'fa-eye',
            'fa-eye-slash',
            'fa-eyedropper',
            'fa-facebook',
            'fa-facebook-f',
            'fa-facebook-official',
            'fa-facebook-square',
            'fa-fast-backward',
            'fa-fast-forward',
            'fa-fax',
            'fa-female',
            'fa-fighter-jet',
            'fa-file',
            'fa-file-archive-o',
            'fa-file-audio-o',
            'fa-file-code-o',
            'fa-file-excel-o',
            'fa-file-image-o',
            'fa-file-movie-o',
            'fa-file-o',
            'fa-file-pdf-o',
            'fa-file-photo-o',
            'fa-file-picture-o',
            'fa-file-powerpoint-o',
            'fa-file-sound-o',
            'fa-file-text',
            'fa-file-text-o',
            'fa-file-video-o',
            'fa-file-word-o',
            'fa-file-zip-o',
            'fa-files-o',
            'fa-film',
            'fa-filter',
            'fa-fire',
            'fa-fire-extinguisher',
            'fa-flag',
            'fa-flag-checkered',
            'fa-flag-o',
            'fa-flash',
            'fa-flask',
            'fa-flickr',
            'fa-floppy-o',
            'fa-folder',
            'fa-folder-o',
            'fa-folder-open',
            'fa-folder-open-o',
            'fa-font',
            'fa-forumbee',
            'fa-forward',
            'fa-foursquare',
            'fa-frown-o',
            'fa-futbol-o',
            'fa-gamepad',
            'fa-gavel',
            'fa-gbp',
            'fa-ge',
            'fa-gear',
            'fa-gears',
            'fa-genderless',
            'fa-gift',
            'fa-git',
            'fa-git-square',
            'fa-github',
            'fa-github-alt',
            'fa-github-square',
            'fa-gittip',
            'fa-glass',
            'fa-globe',
            'fa-google',
            'fa-google-plus',
            'fa-google-plus-square',
            'fa-google-wallet',
            'fa-graduation-cap',
            'fa-gratipay',
            'fa-group',
            'fa-h-square',
            'fa-hacker-news',
            'fa-hand-o-down',
            'fa-hand-o-left',
            'fa-hand-o-right',
            'fa-hand-o-up',
            'fa-hdd-o',
            'fa-header',
            'fa-headphones',
            'fa-heart',
            'fa-heart-o',
            'fa-heartbeat',
            'fa-history',
            'fa-home',
            'fa-hospital-o',
            'fa-hotel',
            'fa-html5',
            'fa-ils',
            'fa-image',
            'fa-inbox',
            'fa-indent',
            'fa-info',
            'fa-info-circle',
            'fa-inr',
            'fa-instagram',
            'fa-institution',
            'fa-ioxhost',
            'fa-italic',
            'fa-joomla',
            'fa-jpy',
            'fa-jsfiddle',
            'fa-key',
            'fa-keyboard-o',
            'fa-krw',
            'fa-language',
            'fa-laptop',
            'fa-lastfm',
            'fa-lastfm-square',
            'fa-leaf',
            'fa-leanpub',
            'fa-legal',
            'fa-lemon-o',
            'fa-level-down',
            'fa-level-up',
            'fa-life-bouy',
            'fa-life-buoy',
            'fa-life-ring',
            'fa-life-saver',
            'fa-lightbulb-o',
            'fa-line-chart',
            'fa-link',
            'fa-linkedin',
            'fa-linkedin-square',
            'fa-linux',
            'fa-list',
            'fa-list-alt',
            'fa-list-ol',
            'fa-list-ul',
            'fa-location-arrow',
            'fa-lock',
            'fa-long-arrow-down',
            'fa-long-arrow-left',
            'fa-long-arrow-right',
            'fa-long-arrow-up',
            'fa-magic',
            'fa-magnet',
            'fa-mail-forward',
            'fa-mail-reply',
            'fa-mail-reply-all',
            'fa-male',
            'fa-map-marker',
            'fa-mars',
            'fa-mars-double',
            'fa-mars-stroke',
            'fa-mars-stroke-h',
            'fa-mars-stroke-v',
            'fa-maxcdn',
            'fa-meanpath',
            'fa-medium',
            'fa-medkit',
            'fa-meh-o',
            'fa-mercury',
            'fa-microphone',
            'fa-microphone-slash',
            'fa-minus',
            'fa-minus-circle',
            'fa-minus-square',
            'fa-minus-square-o',
            'fa-mobile',
            'fa-mobile-phone',
            'fa-money',
            'fa-moon-o',
            'fa-mortar-board',
            'fa-motorcycle',
            'fa-music',
            'fa-navicon',
            'fa-neuter',
            'fa-newspaper-o',
            'fa-openid',
            'fa-outdent',
            'fa-pagelines',
            'fa-paint-brush',
            'fa-paper-plane',
            'fa-paper-plane-o',
            'fa-paperclip',
            'fa-paragraph',
            'fa-paste',
            'fa-pause',
            'fa-paw',
            'fa-paypal',
            'fa-pencil',
            'fa-pencil-square',
            'fa-pencil-square-o',
            'fa-phone',
            'fa-phone-square',
            'fa-photo',
            'fa-picture-o',
            'fa-pie-chart',
            'fa-pied-piper',
            'fa-pied-piper-alt',
            'fa-pinterest',
            'fa-pinterest-p',
            'fa-pinterest-square',
            'fa-plane',
            'fa-play',
            'fa-play-circle',
            'fa-play-circle-o',
            'fa-plug',
            'fa-plus',
            'fa-plus-circle',
            'fa-plus-square',
            'fa-plus-square-o',
            'fa-power-off',
            'fa-print',
            'fa-pulse',
            'fa-puzzle-piece',
            'fa-qq',
            'fa-qrcode',
            'fa-question',
            'fa-question-circle',
            'fa-quote-left',
            'fa-quote-right',
            'fa-ra',
            'fa-random',
            'fa-rebel',
            'fa-recycle',
            'fa-reddit',
            'fa-reddit-square',
            'fa-refresh',
            'fa-remove',
            'fa-renren',
            'fa-reorder',
            'fa-repeat',
            'fa-reply',
            'fa-reply-all',
            'fa-retweet',
            'fa-rmb',
            'fa-road',
            'fa-rocket',
            'fa-rouble',
            'fa-rss',
            'fa-rss-square',
            'fa-rub',
            'fa-ruble',
            'fa-rupee',
            'fa-save',
            'fa-scissors',
            'fa-search',
            'fa-search-minus',
            'fa-search-plus',
            'fa-sellsy',
            'fa-send',
            'fa-send-o',
            'fa-server',
            'fa-share',
            'fa-share-alt',
            'fa-share-alt-square',
            'fa-share-square',
            'fa-share-square-o',
            'fa-shekel',
            'fa-sheqel',
            'fa-shield',
            'fa-ship',
            'fa-shirtsinbulk',
            'fa-shopping-cart',
            'fa-sign-in',
            'fa-sign-out',
            'fa-signal',
            'fa-simplybuilt',
            'fa-sitemap',
            'fa-skyatlas',
            'fa-skype',
            'fa-slack',
            'fa-sliders',
            'fa-slideshare',
            'fa-smile-o',
            'fa-soccer-ball-o',
            'fa-sort',
            'fa-sort-alpha-asc',
            'fa-sort-alpha-desc',
            'fa-sort-amount-asc',
            'fa-sort-amount-desc',
            'fa-sort-asc',
            'fa-sort-desc',
            'fa-sort-down',
            'fa-sort-numeric-asc',
            'fa-sort-numeric-desc',
            'fa-sort-up',
            'fa-soundcloud',
            'fa-space-shuttle',
            'fa-spin',
            'fa-spinner',
            'fa-spoon',
            'fa-spotify',
            'fa-square',
            'fa-square-o',
            'fa-stack-exchange',
            'fa-stack-overflow',
            'fa-star',
            'fa-star-half',
            'fa-star-half-empty',
            'fa-star-half-full',
            'fa-star-half-o',
            'fa-star-o',
            'fa-steam',
            'fa-steam-square',
            'fa-step-backward',
            'fa-step-forward',
            'fa-stethoscope',
            'fa-stop',
            'fa-street-view',
            'fa-strikethrough',
            'fa-stumbleupon',
            'fa-stumbleupon-circle',
            'fa-subscript',
            'fa-subway',
            'fa-suitcase',
            'fa-sun-o',
            'fa-superscript',
            'fa-support',
            'fa-table',
            'fa-tablet',
            'fa-tachometer',
            'fa-tag',
            'fa-tags',
            'fa-tasks',
            'fa-taxi',
            'fa-tencent-weibo',
            'fa-terminal',
            'fa-text-height',
            'fa-text-width',
            'fa-th',
            'fa-th-large',
            'fa-th-list',
            'fa-thumb-tack',
            'fa-thumbs-down',
            'fa-thumbs-o-down',
            'fa-thumbs-o-up',
            'fa-thumbs-up',
            'fa-ticket',
            'fa-times',
            'fa-times-circle',
            'fa-times-circle-o',
            'fa-tint',
            'fa-toggle-down',
            'fa-toggle-left',
            'fa-toggle-off',
            'fa-toggle-on',
            'fa-toggle-right',
            'fa-toggle-up',
            'fa-train',
            'fa-transgender',
            'fa-transgender-alt',
            'fa-trash',
            'fa-trash-o',
            'fa-tree',
            'fa-trello',
            'fa-trophy',
            'fa-truck',
            'fa-try',
            'fa-tty',
            'fa-tumblr',
            'fa-tumblr-square',
            'fa-turkish-lira',
            'fa-twitch',
            'fa-twitter',
            'fa-twitter-square',
            'fa-umbrella',
            'fa-underline',
            'fa-undo',
            'fa-university',
            'fa-unlink',
            'fa-unlock',
            'fa-unlock-alt',
            'fa-unsorted',
            'fa-upload',
            'fa-usd',
            'fa-user',
            'fa-user-md',
            'fa-user-plus',
            'fa-user-secret',
            'fa-user-times',
            'fa-users',
            'fa-venus',
            'fa-venus-double',
            'fa-venus-mars',
            'fa-viacoin',
            'fa-video-camera',
            'fa-vimeo-square',
            'fa-vine',
            'fa-vk',
            'fa-volume-down',
            'fa-volume-off',
            'fa-volume-up',
            'fa-warning',
            'fa-wechat',
            'fa-weibo',
            'fa-weixin',
            'fa-whatsapp',
            'fa-wheelchair',
            'fa-wifi',
            'fa-windows',
            'fa-won',
            'fa-wordpress',
            'fa-wrench',
            'fa-xing',
            'fa-xing-square',
            'fa-yahoo',
            'fa-yelp',
            'fa-yen',
            'fa-youtube',
            'fa-youtube-play',
            'fa-youtube-square'
          ]
        },
        ionicons: {
          baseClass: 'icon fa-fw fa-3x',
          icons: [
            'ion-alert',
            'ion-alert-circled',
            'ion-android-add',
            'ion-android-add-circle',
            'ion-android-alarm-clock',
            'ion-android-alert',
            'ion-android-apps',
            'ion-android-archive',
            'ion-android-arrow-back',
            'ion-android-arrow-down',
            'ion-android-arrow-dropdown',
            'ion-android-arrow-dropdown-circle',
            'ion-android-arrow-dropleft',
            'ion-android-arrow-dropleft-circle',
            'ion-android-arrow-dropright',
            'ion-android-arrow-dropright-circle',
            'ion-android-arrow-dropup',
            'ion-android-arrow-dropup-circle',
            'ion-android-arrow-forward',
            'ion-android-arrow-up',
            'ion-android-attach',
            'ion-android-bar',
            'ion-android-bicycle',
            'ion-android-boat',
            'ion-android-bookmark',
            'ion-android-bulb',
            'ion-android-bus',
            'ion-android-calendar',
            'ion-android-call',
            'ion-android-camera',
            'ion-android-cancel',
            'ion-android-car',
            'ion-android-cart',
            'ion-android-chat',
            'ion-android-checkbox',
            'ion-android-checkbox-blank',
            'ion-android-checkbox-outline',
            'ion-android-checkbox-outline-blank',
            'ion-android-checkmark-circle',
            'ion-android-clipboard',
            'ion-android-close',
            'ion-android-cloud',
            'ion-android-cloud-circle',
            'ion-android-cloud-done',
            'ion-android-cloud-outline',
            'ion-android-color-palette',
            'ion-android-compass',
            'ion-android-contact',
            'ion-android-contacts',
            'ion-android-contract',
            'ion-android-create',
            'ion-android-delete',
            'ion-android-desktop',
            'ion-android-document',
            'ion-android-done',
            'ion-android-done-all',
            'ion-android-download',
            'ion-android-drafts',
            'ion-android-exit',
            'ion-android-expand',
            'ion-android-favorite',
            'ion-android-favorite-outline',
            'ion-android-film',
            'ion-android-folder',
            'ion-android-folder-open',
            'ion-android-funnel',
            'ion-android-globe',
            'ion-android-hand',
            'ion-android-hangout',
            'ion-android-happy',
            'ion-android-home',
            'ion-android-image',
            'ion-android-laptop',
            'ion-android-list',
            'ion-android-locate',
            'ion-android-lock',
            'ion-android-mail',
            'ion-android-map',
            'ion-android-menu',
            'ion-android-microphone',
            'ion-android-microphone-off',
            'ion-android-more-horizontal',
            'ion-android-more-vertical',
            'ion-android-navigate',
            'ion-android-notifications',
            'ion-android-notifications-none',
            'ion-android-notifications-off',
            'ion-android-open',
            'ion-android-options',
            'ion-android-people',
            'ion-android-person',
            'ion-android-person-add',
            'ion-android-phone-landscape',
            'ion-android-phone-portrait',
            'ion-android-pin',
            'ion-android-plane',
            'ion-android-playstore',
            'ion-android-print',
            'ion-android-radio-button-off',
            'ion-android-radio-button-on',
            'ion-android-refresh',
            'ion-android-remove',
            'ion-android-remove-circle',
            'ion-android-restaurant',
            'ion-android-sad',
            'ion-android-search',
            'ion-android-send',
            'ion-android-settings',
            'ion-android-share',
            'ion-android-share-alt',
            'ion-android-star',
            'ion-android-star-half',
            'ion-android-star-outline',
            'ion-android-stopwatch',
            'ion-android-subway',
            'ion-android-sunny',
            'ion-android-sync',
            'ion-android-textsms',
            'ion-android-time',
            'ion-android-train',
            'ion-android-unlock',
            'ion-android-upload',
            'ion-android-volume-down',
            'ion-android-volume-mute',
            'ion-android-volume-off',
            'ion-android-volume-up',
            'ion-android-walk',
            'ion-android-warning',
            'ion-android-watch',
            'ion-android-wifi',
            'ion-aperture',
            'ion-archive',
            'ion-arrow-down-a',
            'ion-arrow-down-b',
            'ion-arrow-down-c',
            'ion-arrow-expand',
            'ion-arrow-graph-down-left',
            'ion-arrow-graph-down-right',
            'ion-arrow-graph-up-left',
            'ion-arrow-graph-up-right',
            'ion-arrow-left-a',
            'ion-arrow-left-b',
            'ion-arrow-left-c',
            'ion-arrow-move',
            'ion-arrow-resize',
            'ion-arrow-return-left',
            'ion-arrow-return-right',
            'ion-arrow-right-a',
            'ion-arrow-right-b',
            'ion-arrow-right-c',
            'ion-arrow-shrink',
            'ion-arrow-swap',
            'ion-arrow-up-a',
            'ion-arrow-up-b',
            'ion-arrow-up-c',
            'ion-asterisk',
            'ion-at',
            'ion-backspace',
            'ion-backspace-outline',
            'ion-bag',
            'ion-battery-charging',
            'ion-battery-empty',
            'ion-battery-full',
            'ion-battery-half',
            'ion-battery-low',
            'ion-beaker',
            'ion-beer',
            'ion-bluetooth',
            'ion-bonfire',
            'ion-bookmark',
            'ion-bowtie',
            'ion-briefcase',
            'ion-bug',
            'ion-calculator',
            'ion-calendar',
            'ion-camera',
            'ion-card',
            'ion-cash',
            'ion-chatbox',
            'ion-chatbox-working',
            'ion-chatboxes',
            'ion-chatbubble',
            'ion-chatbubble-working',
            'ion-chatbubbles',
            'ion-checkmark',
            'ion-checkmark-circled',
            'ion-checkmark-round',
            'ion-chevron-down',
            'ion-chevron-left',
            'ion-chevron-right',
            'ion-chevron-up',
            'ion-clipboard',
            'ion-clock',
            'ion-close',
            'ion-close-circled',
            'ion-close-round',
            'ion-closed-captioning',
            'ion-cloud',
            'ion-code',
            'ion-code-download',
            'ion-code-working',
            'ion-coffee',
            'ion-compass',
            'ion-compose',
            'ion-connection-bars',
            'ion-contrast',
            'ion-crop',
            'ion-cube',
            'ion-disc',
            'ion-document',
            'ion-document-text',
            'ion-drag',
            'ion-earth',
            'ion-easel',
            'ion-edit',
            'ion-egg',
            'ion-eject',
            'ion-email',
            'ion-email-unread',
            'ion-erlenmeyer-flask',
            'ion-erlenmeyer-flask-bubbles',
            'ion-eye',
            'ion-eye-disabled',
            'ion-female',
            'ion-filing',
            'ion-film-marker',
            'ion-fireball',
            'ion-flag',
            'ion-flame',
            'ion-flash',
            'ion-flash-off',
            'ion-folder',
            'ion-fork',
            'ion-fork-repo',
            'ion-forward',
            'ion-funnel',
            'ion-gear-a',
            'ion-gear-b',
            'ion-grid',
            'ion-hammer',
            'ion-happy',
            'ion-happy-outline',
            'ion-headphone',
            'ion-heart',
            'ion-heart-broken',
            'ion-help',
            'ion-help-buoy',
            'ion-help-circled',
            'ion-home',
            'ion-icecream',
            'ion-image',
            'ion-images',
            'ion-information',
            'ion-information-circled',
            'ion-ionic',
            'ion-ios-alarm',
            'ion-ios-alarm-outline',
            'ion-ios-albums',
            'ion-ios-albums-outline',
            'ion-ios-americanfootball',
            'ion-ios-americanfootball-outline',
            'ion-ios-analytics',
            'ion-ios-analytics-outline',
            'ion-ios-arrow-back',
            'ion-ios-arrow-down',
            'ion-ios-arrow-forward',
            'ion-ios-arrow-left',
            'ion-ios-arrow-right',
            'ion-ios-arrow-thin-down',
            'ion-ios-arrow-thin-left',
            'ion-ios-arrow-thin-right',
            'ion-ios-arrow-thin-up',
            'ion-ios-arrow-up',
            'ion-ios-at',
            'ion-ios-at-outline',
            'ion-ios-barcode',
            'ion-ios-barcode-outline',
            'ion-ios-baseball',
            'ion-ios-baseball-outline',
            'ion-ios-basketball',
            'ion-ios-basketball-outline',
            'ion-ios-bell',
            'ion-ios-bell-outline',
            'ion-ios-body',
            'ion-ios-body-outline',
            'ion-ios-bolt',
            'ion-ios-bolt-outline',
            'ion-ios-book',
            'ion-ios-book-outline',
            'ion-ios-bookmarks',
            'ion-ios-bookmarks-outline',
            'ion-ios-box',
            'ion-ios-box-outline',
            'ion-ios-briefcase',
            'ion-ios-briefcase-outline',
            'ion-ios-browsers',
            'ion-ios-browsers-outline',
            'ion-ios-calculator',
            'ion-ios-calculator-outline',
            'ion-ios-calendar',
            'ion-ios-calendar-outline',
            'ion-ios-camera',
            'ion-ios-camera-outline',
            'ion-ios-cart',
            'ion-ios-cart-outline',
            'ion-ios-chatboxes',
            'ion-ios-chatboxes-outline',
            'ion-ios-chatbubble',
            'ion-ios-chatbubble-outline',
            'ion-ios-checkmark',
            'ion-ios-checkmark-empty',
            'ion-ios-checkmark-outline',
            'ion-ios-circle-filled',
            'ion-ios-circle-outline',
            'ion-ios-clock',
            'ion-ios-clock-outline',
            'ion-ios-close',
            'ion-ios-close-empty',
            'ion-ios-close-outline',
            'ion-ios-cloud',
            'ion-ios-cloud-download',
            'ion-ios-cloud-download-outline',
            'ion-ios-cloud-outline',
            'ion-ios-cloud-upload',
            'ion-ios-cloud-upload-outline',
            'ion-ios-cloudy',
            'ion-ios-cloudy-night',
            'ion-ios-cloudy-night-outline',
            'ion-ios-cloudy-outline',
            'ion-ios-cog',
            'ion-ios-cog-outline',
            'ion-ios-color-filter',
            'ion-ios-color-filter-outline',
            'ion-ios-color-wand',
            'ion-ios-color-wand-outline',
            'ion-ios-compose',
            'ion-ios-compose-outline',
            'ion-ios-contact',
            'ion-ios-contact-outline',
            'ion-ios-copy',
            'ion-ios-copy-outline',
            'ion-ios-crop',
            'ion-ios-crop-strong',
            'ion-ios-download',
            'ion-ios-download-outline',
            'ion-ios-drag',
            'ion-ios-email',
            'ion-ios-email-outline',
            'ion-ios-eye',
            'ion-ios-eye-outline',
            'ion-ios-fastforward',
            'ion-ios-fastforward-outline',
            'ion-ios-filing',
            'ion-ios-filing-outline',
            'ion-ios-film',
            'ion-ios-film-outline',
            'ion-ios-flag',
            'ion-ios-flag-outline',
            'ion-ios-flame',
            'ion-ios-flame-outline',
            'ion-ios-flask',
            'ion-ios-flask-outline',
            'ion-ios-flower',
            'ion-ios-flower-outline',
            'ion-ios-folder',
            'ion-ios-folder-outline',
            'ion-ios-football',
            'ion-ios-football-outline',
            'ion-ios-game-controller-a',
            'ion-ios-game-controller-a-outline',
            'ion-ios-game-controller-b',
            'ion-ios-game-controller-b-outline',
            'ion-ios-gear',
            'ion-ios-gear-outline',
            'ion-ios-glasses',
            'ion-ios-glasses-outline',
            'ion-ios-grid-view',
            'ion-ios-grid-view-outline',
            'ion-ios-heart',
            'ion-ios-heart-outline',
            'ion-ios-help',
            'ion-ios-help-empty',
            'ion-ios-help-outline',
            'ion-ios-home',
            'ion-ios-home-outline',
            'ion-ios-infinite',
            'ion-ios-infinite-outline',
            'ion-ios-information',
            'ion-ios-information-empty',
            'ion-ios-information-outline',
            'ion-ios-ionic-outline',
            'ion-ios-keypad',
            'ion-ios-keypad-outline',
            'ion-ios-lightbulb',
            'ion-ios-lightbulb-outline',
            'ion-ios-list',
            'ion-ios-list-outline',
            'ion-ios-location',
            'ion-ios-location-outline',
            'ion-ios-locked',
            'ion-ios-locked-outline',
            'ion-ios-loop',
            'ion-ios-loop-strong',
            'ion-ios-medical',
            'ion-ios-medical-outline',
            'ion-ios-medkit',
            'ion-ios-medkit-outline',
            'ion-ios-mic',
            'ion-ios-mic-off',
            'ion-ios-mic-outline',
            'ion-ios-minus',
            'ion-ios-minus-empty',
            'ion-ios-minus-outline',
            'ion-ios-monitor',
            'ion-ios-monitor-outline',
            'ion-ios-moon',
            'ion-ios-moon-outline',
            'ion-ios-more',
            'ion-ios-more-outline',
            'ion-ios-musical-note',
            'ion-ios-musical-notes',
            'ion-ios-navigate',
            'ion-ios-navigate-outline',
            'ion-ios-nutrition',
            'ion-ios-nutrition-outline',
            'ion-ios-paper',
            'ion-ios-paper-outline',
            'ion-ios-paperplane',
            'ion-ios-paperplane-outline',
            'ion-ios-partlysunny',
            'ion-ios-partlysunny-outline',
            'ion-ios-pause',
            'ion-ios-pause-outline',
            'ion-ios-paw',
            'ion-ios-paw-outline',
            'ion-ios-people',
            'ion-ios-people-outline',
            'ion-ios-person',
            'ion-ios-person-outline',
            'ion-ios-personadd',
            'ion-ios-personadd-outline',
            'ion-ios-photos',
            'ion-ios-photos-outline',
            'ion-ios-pie',
            'ion-ios-pie-outline',
            'ion-ios-pint',
            'ion-ios-pint-outline',
            'ion-ios-play',
            'ion-ios-play-outline',
            'ion-ios-plus',
            'ion-ios-plus-empty',
            'ion-ios-plus-outline',
            'ion-ios-pricetag',
            'ion-ios-pricetag-outline',
            'ion-ios-pricetags',
            'ion-ios-pricetags-outline',
            'ion-ios-printer',
            'ion-ios-printer-outline',
            'ion-ios-pulse',
            'ion-ios-pulse-strong',
            'ion-ios-rainy',
            'ion-ios-rainy-outline',
            'ion-ios-recording',
            'ion-ios-recording-outline',
            'ion-ios-redo',
            'ion-ios-redo-outline',
            'ion-ios-refresh',
            'ion-ios-refresh-empty',
            'ion-ios-refresh-outline',
            'ion-ios-reload',
            'ion-ios-reverse-camera',
            'ion-ios-reverse-camera-outline',
            'ion-ios-rewind',
            'ion-ios-rewind-outline',
            'ion-ios-rose',
            'ion-ios-rose-outline',
            'ion-ios-search',
            'ion-ios-search-strong',
            'ion-ios-settings',
            'ion-ios-settings-strong',
            'ion-ios-shuffle',
            'ion-ios-shuffle-strong',
            'ion-ios-skipbackward',
            'ion-ios-skipbackward-outline',
            'ion-ios-skipforward',
            'ion-ios-skipforward-outline',
            'ion-ios-snowy',
            'ion-ios-speedometer',
            'ion-ios-speedometer-outline',
            'ion-ios-star',
            'ion-ios-star-half',
            'ion-ios-star-outline',
            'ion-ios-stopwatch',
            'ion-ios-stopwatch-outline',
            'ion-ios-sunny',
            'ion-ios-sunny-outline',
            'ion-ios-telephone',
            'ion-ios-telephone-outline',
            'ion-ios-tennisball',
            'ion-ios-tennisball-outline',
            'ion-ios-thunderstorm',
            'ion-ios-thunderstorm-outline',
            'ion-ios-time',
            'ion-ios-time-outline',
            'ion-ios-timer',
            'ion-ios-timer-outline',
            'ion-ios-toggle',
            'ion-ios-toggle-outline',
            'ion-ios-trash',
            'ion-ios-trash-outline',
            'ion-ios-undo',
            'ion-ios-undo-outline',
            'ion-ios-unlocked',
            'ion-ios-unlocked-outline',
            'ion-ios-upload',
            'ion-ios-upload-outline',
            'ion-ios-videocam',
            'ion-ios-videocam-outline',
            'ion-ios-volume-high',
            'ion-ios-volume-low',
            'ion-ios-wineglass',
            'ion-ios-wineglass-outline',
            'ion-ios-world',
            'ion-ios-world-outline',
            'ion-ipad',
            'ion-iphone',
            'ion-ipod',
            'ion-jet',
            'ion-key',
            'ion-knife',
            'ion-laptop',
            'ion-leaf',
            'ion-levels',
            'ion-lightbulb',
            'ion-link',
            'ion-load-a',
            'ion-load-b',
            'ion-load-c',
            'ion-load-d',
            'ion-location',
            'ion-lock-combination',
            'ion-locked',
            'ion-log-in',
            'ion-log-out',
            'ion-loop',
            'ion-magnet',
            'ion-male',
            'ion-man',
            'ion-map',
            'ion-medkit',
            'ion-merge',
            'ion-mic-a',
            'ion-mic-b',
            'ion-mic-c',
            'ion-minus',
            'ion-minus-circled',
            'ion-minus-round',
            'ion-model-s',
            'ion-monitor',
            'ion-more',
            'ion-mouse',
            'ion-music-note',
            'ion-navicon',
            'ion-navicon-round',
            'ion-navigate',
            'ion-network',
            'ion-no-smoking',
            'ion-nuclear',
            'ion-outlet',
            'ion-paintbrush',
            'ion-paintbucket',
            'ion-paper-airplane',
            'ion-paperclip',
            'ion-pause',
            'ion-person',
            'ion-person-add',
            'ion-person-stalker',
            'ion-pie-graph',
            'ion-pin',
            'ion-pinpoint',
            'ion-pizza',
            'ion-plane',
            'ion-planet',
            'ion-play',
            'ion-playstation',
            'ion-plus',
            'ion-plus-circled',
            'ion-plus-round',
            'ion-podium',
            'ion-pound',
            'ion-power',
            'ion-pricetag',
            'ion-pricetags',
            'ion-printer',
            'ion-pull-request',
            'ion-qr-scanner',
            'ion-quote',
            'ion-radio-waves',
            'ion-record',
            'ion-refresh',
            'ion-reply',
            'ion-reply-all',
            'ion-ribbon-a',
            'ion-ribbon-b',
            'ion-sad',
            'ion-sad-outline',
            'ion-scissors',
            'ion-search',
            'ion-settings',
            'ion-share',
            'ion-shuffle',
            'ion-skip-backward',
            'ion-skip-forward',
            'ion-social-android',
            'ion-social-android-outline',
            'ion-social-angular',
            'ion-social-angular-outline',
            'ion-social-apple',
            'ion-social-apple-outline',
            'ion-social-bitcoin',
            'ion-social-bitcoin-outline',
            'ion-social-buffer',
            'ion-social-buffer-outline',
            'ion-social-chrome',
            'ion-social-chrome-outline',
            'ion-social-codepen',
            'ion-social-codepen-outline',
            'ion-social-css3',
            'ion-social-css3-outline',
            'ion-social-designernews',
            'ion-social-designernews-outline',
            'ion-social-dribbble',
            'ion-social-dribbble-outline',
            'ion-social-dropbox',
            'ion-social-dropbox-outline',
            'ion-social-euro',
            'ion-social-euro-outline',
            'ion-social-facebook',
            'ion-social-facebook-outline',
            'ion-social-foursquare',
            'ion-social-foursquare-outline',
            'ion-social-freebsd-devil',
            'ion-social-github',
            'ion-social-github-outline',
            'ion-social-google',
            'ion-social-google-outline',
            'ion-social-googleplus',
            'ion-social-googleplus-outline',
            'ion-social-hackernews',
            'ion-social-hackernews-outline',
            'ion-social-html5',
            'ion-social-html5-outline',
            'ion-social-instagram',
            'ion-social-instagram-outline',
            'ion-social-javascript',
            'ion-social-javascript-outline',
            'ion-social-linkedin',
            'ion-social-linkedin-outline',
            'ion-social-markdown',
            'ion-social-nodejs',
            'ion-social-octocat',
            'ion-social-pinterest',
            'ion-social-pinterest-outline',
            'ion-social-python',
            'ion-social-reddit',
            'ion-social-reddit-outline',
            'ion-social-rss',
            'ion-social-rss-outline',
            'ion-social-sass',
            'ion-social-skype',
            'ion-social-skype-outline',
            'ion-social-snapchat',
            'ion-social-snapchat-outline',
            'ion-social-tumblr',
            'ion-social-tumblr-outline',
            'ion-social-tux',
            'ion-social-twitch',
            'ion-social-twitch-outline',
            'ion-social-twitter',
            'ion-social-twitter-outline',
            'ion-social-usd',
            'ion-social-usd-outline',
            'ion-social-vimeo',
            'ion-social-vimeo-outline',
            'ion-social-whatsapp',
            'ion-social-whatsapp-outline',
            'ion-social-windows',
            'ion-social-windows-outline',
            'ion-social-wordpress',
            'ion-social-wordpress-outline',
            'ion-social-yahoo',
            'ion-social-yahoo-outline',
            'ion-social-yen',
            'ion-social-yen-outline',
            'ion-social-youtube',
            'ion-social-youtube-outline',
            'ion-soup-can',
            'ion-soup-can-outline',
            'ion-speakerphone',
            'ion-speedometer',
            'ion-spoon',
            'ion-star',
            'ion-stats-bars',
            'ion-steam',
            'ion-stop',
            'ion-thermometer',
            'ion-thumbsdown',
            'ion-thumbsup',
            'ion-toggle',
            'ion-toggle-filled',
            'ion-transgender',
            'ion-trash-a',
            'ion-trash-b',
            'ion-trophy',
            'ion-tshirt',
            'ion-tshirt-outline',
            'ion-umbrella',
            'ion-university',
            'ion-unlocked',
            'ion-upload',
            'ion-usb',
            'ion-videocamera',
            'ion-volume-high',
            'ion-volume-low',
            'ion-volume-medium',
            'ion-volume-mute',
            'ion-wand',
            'ion-waterdrop',
            'ion-wifi',
            'ion-wineglass',
            'ion-woman',
            'ion-wrench',
            'ion-xbox'
          ]
        }
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.sandbox')
    .controller('SandboxSchemaformCtrl', ["CoreService", function (CoreService) {

      this.model = {};

      this.schema = {
        type: 'object',
        title: 'Comment',
        properties: {
          name: {
            title: 'Name',
            type: 'string'
          },
          email: {
            title: 'Email',
            type: 'string',
            pattern: '^\\S+@\\S+$'
          },
          comment: {
            title: 'Comment',
            type: 'string'
          }
        },
        required: [
          'name',
          'email',
          'comment'
        ]
      }
      ;

      this.form = [
        'name',
        'email',
        {
          key: 'comment',
          type: 'textarea',
          placeholder: 'Make a comment'
        },
        {
          type: 'submit',
          title: 'OK'
        }
      ];

      this.onSubmit = function () {
        CoreService.alertSuccess('Good job!', 'Well done, ' + this.model.name);
      };
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.sandbox')
    .controller('SandboxTreesCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
      var appleSelected, tree, treedataAvm, treedataGeography;
      $scope.myTreeHandler = function (branch) {
        var _ref;
        $scope.output = 'You selected: ' + branch.label;
        if ((_ref = branch.data) !== null ? _ref.description : void 0) {
          return $scope.output += '(' + branch.data.description + ')';
        }
      };
      appleSelected = function (branch) {
        $scope.output = 'APPLE! : ' + branch.label;
        return $scope.output;
      };
      treedataAvm = [
        {
          label: 'Animal',
          children: [
            {
              label: 'Dog',
              data: {
                description: 'man\'s best friend'
              }
            },
            {
              label: 'Cat',
              data: {
                description: 'Felis catus'
              }
            },
            {
              label: 'Hippopotamus',
              data: {
                description: 'hungry, hungry'
              }
            },
            {
              label: 'Chicken',
              children: [
                'White Leghorn',
                'Rhode Island Red',
                'Jersey Giant'
              ]
            }
          ]
        },
        {
          label: 'Vegetable',
          data: {
            definition: 'A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.',
            dataCanContainAnything: true
          },
          onSelect: function (branch) {
            $scope.output = 'Vegetable: ' + branch.data.definition;
            return $scope.output;
          },
          children: [
            {
              label: 'Oranges'
            },
            {
              label: 'Apples',
              children: [
                {
                  label: 'Granny Smith',
                  onSelect: appleSelected
                },
                {
                  label: 'Red Delicous',
                  onSelect: appleSelected
                },
                {
                  label: 'Fuji',
                  onSelect: appleSelected
                }
              ]
            }
          ]
        },
        {
          label: 'Mineral',
          children: [
            {
              label: 'Rock',
              children: [
                'Igneous',
                'Sedimentary',
                'Metamorphic'
              ]
            },
            {
              label: 'Metal',
              children: [
                'Aluminum',
                'Steel',
                'Copper'
              ]
            },
            {
              label: 'Plastic',
              children: [
                {
                  label: 'Thermoplastic',
                  children: [
                    'polyethylene',
                    'polypropylene',
                    'polystyrene',
                    ' polyvinyl chloride'
                  ]
                },
                {
                  label: 'Thermosetting Polymer',
                  children: [
                    'polyester',
                    'polyurethane',
                    'vulcanized rubber',
                    'bakelite',
                    'urea-formaldehyde'
                  ]
                }
              ]
            }
          ]
        }
      ];
      treedataGeography = [
        {
          label: 'North America',
          children: [
            {
              label: 'Canada',
              children: [
                'Toronto',
                'Vancouver'
              ]
            },
            {
              label: 'USA',
              children: [
                'New York',
                'Los Angeles'
              ]
            },
            {
              label: 'Mexico',
              children: [
                'Mexico City',
                'Guadalajara'
              ]
            }
          ]
        },
        {
          label: 'South America',
          children: [
            {
              label: 'Venezuela',
              children: [
                'Caracas',
                'Maracaibo'
              ]
            },
            {
              label: 'Brazil',
              children: [
                'Sao Paulo',
                'Rio de Janeiro'
              ]
            },
            {
              label: 'Argentina',
              children: [
                'Buenos Aires',
                'Cordoba'
              ]
            }
          ]
        }
      ];
      $scope.myTreeData = treedataAvm;
      $scope.tryChangingTheTreeData = function () {
        if ($scope.myTreeData === treedataAvm) {
          $scope.myTreeData = treedataGeography;
          return $scope.myTreeData;
        } else {
          $scope.myTreeData = treedataAvm;
          return $scope.myTreeData;
        }
      };
      $scope.myTree = tree = {};
      $scope.tryAsyncLoad = function () {
        $scope.myTreeData = [];
        $scope.doingAsync = true;
        return $timeout(function () {
          if (Math.random() < 0.5) {
            $scope.myTreeData = treedataAvm;
          } else {
            $scope.myTreeData = treedataGeography;
          }
          $scope.doingAsync = false;
          return tree.expandAll();
        }, 1000);
      };
      $scope.tryAddingABranch = function () {
        var b;
        b = tree.getSelectedBranch();
        return tree.addBranch(b, {
          label: 'New Branch',
          data: {
            something: 42,
            'else': 43
          }
        });
      };
      return $scope.tryAddingABranch;
    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.settings', []);
})();

(function () {
  'use strict';
  angular
    .module('com.module.settings')
    .run(["$rootScope", "gettextCatalog", function ($rootScope, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Settings'),
        'app.settings.list', 'fa-cog');

      $rootScope.getSetting = function (key) {
        var valor = '';
        angular.forEach($rootScope.settings.data, function (item) {
          if (item.key === key) {
            valor = item.value;
          }
        });
        return valor;
      };
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.settings')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('app.settings', {
          abstract: true,
          url: '/settings',
          templateUrl: 'modules/settings/views/main.html'
        })
        .state('app.settings.list', {
          url: '',
          templateUrl: 'modules/settings/views/list.html',
          controllerAs: 'ctrl',
          controller: ["settings", function (settings) {
            this.settings = settings;
          }],
          resolve: {
            settings: ["SettingService", function (SettingService) {
              return SettingService.find();
            }]
          }
        })
        .state('app.settings.add', {
          url: '/add',
          templateUrl: 'modules/settings/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "SettingService", "setting", function ($state, SettingService, setting) {
            this.setting = setting;
            this.formFields = SettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              SettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            setting: function () {
              return {};
            }
          }
        })
        .state('app.settings.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/settings/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "SettingService", "setting", function ($state, SettingService, setting) {
            this.setting = setting;
            this.formFields = SettingService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              SettingService.upsert(this.setting).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            setting: ["$stateParams", "SettingService", function ($stateParams, SettingService) {
              return SettingService.findById($stateParams.id);
            }]
          }
        })
        .state('app.settings.view', {
          url: '/:id',
          templateUrl: 'modules/settings/views/view.html',
          controllerAs: 'ctrl',
          controller: ["setting", function (setting) {
            this.setting = setting;
          }],
          resolve: {
            setting: ["$stateParams", "SettingService", function ($stateParams, SettingService) {
              return SettingService.findById($stateParams.id);
            }]
          }
        })
        .state('app.settings.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: ["$stateParams", "$state", "SettingService", function ($stateParams, $state, SettingService) {
            SettingService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }]
        });
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.settings')
    .service('SettingService', ["$state", "CoreService", "Setting", "gettextCatalog", function ($state, CoreService, Setting, gettextCatalog) {

      this.find = function () {
        return Setting.find().$promise;
      };

      this.findById = function (id) {
        return Setting.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (setting) {
        return Setting.upsert(setting).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Setting saved'),
              gettextCatalog.getString('Your setting is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving setting '),
              gettextCatalog.getString('This setting could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Setting.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Setting deleted'),
                gettextCatalog.getString('Your setting is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting setting'),
                gettextCatalog.getString('Your setting is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function () {
        var form = [
          {
            key: 'key',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Value'),
              required: true
            }
          },
          {
            key: 'value',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Key'),
              required: true
            }
          }
        ];
        return form;
      };

    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.tagged', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .run(["$rootScope", "Taggedpost", "gettextCatalog", function ($rootScope, Taggedpost, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Taggedposts'), 'app.tagged.list', 'fa-edit');

      Taggedpost.find(function (posts) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Taggedposts'), 'bg-red', 'ion-document-text', posts.length, 'app.posts.list');
      });

    }]);

})();

(function() {
	'use strict';
	angular
		.module('com.module.tagged')
		.config(["$stateProvider", function($stateProvider) {
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
					controller: ["tagged", function(tagged) {
						this.tagged = tagged;
					}],
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
					controller: ["$state", "TaggedpostsService", "tagged", function($state, TaggedpostsService, tagged) {
						this.tagged = tagged;
						this.formFields = TaggedpostsService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							TaggedpostsService.upsertTaggedpost(this.tagged).then(function() {
								$state.go('^.list');
							});
						};
					}],
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
					controller: ["$state", "TaggedpostsService", "tagged", function($state, TaggedpostsService, tagged) {
						console.log(tagged);
						this.tagged = tagged;
						this.formFields = TaggedpostsService.getFormFields();
						this.formOptions = {};
						this.submit = function() {
							TaggedpostsService.upsertTaggedpost(this.tagged).then(function() {
								$state.go('^.list');
							});
						};
					}],
					resolve: {
						tagged: ["$stateParams", "TaggedpostsService", function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}]
					}
				})
				.state('app.tagged.view', {
					url: '/:id',
					templateUrl: 'modules/tagged/views/view.html',
					controllerAs: 'ctrl',
					controller: ["tagged", function(tagged) {
						this.tagged = tagged;
					}],
					resolve: {
						tagged: ["$stateParams", "TaggedpostsService", function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}]
					}
				})
				.state('app.tagged.delete', {
					url: '/:id/delete',
					template: '',
					controllerAs: 'ctrl',
					controller: ["$state", "TaggedpostsService", "tagged", function($state, TaggedpostsService, tagged) {
						TaggedpostsService.deleteTaggedpost(tagged.id, function() {
							$state.go('^.list');
						}, function() {
							$state.go('^.list');
						});
					}],
					resolve: {
						tagged: ["$stateParams", "TaggedpostsService", function($stateParams, TaggedpostsService) {
							return TaggedpostsService.getTaggedpost($stateParams.id);
						}]
					}
				});
		}]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.tagged')
    .service('TaggedpostsService', ["CoreService", "Taggedpost", "gettextCatalog", function (CoreService, Taggedpost, gettextCatalog) {
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

    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name com.module.about
   * @module
   * @description
   * @requires loopbackApp
   *
   * The `com.module.core` module provides services for interacting with
   * the models exposed by the LoopBack server via the REST API.
   *
   */
  angular.module('com.module.testzone', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.testzone')
    .run(["$rootScope", "gettextCatalog", function ($rootScope, gettextCatalog) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Test Zone'), 'bg-maroon',
        'ion-information', 0, 'app.testzone.index');
    }]);
})();

(function () {
  'use strict';
  angular
    .module('com.module.testzone')
  /**
   * @ngdoc function
   * @name com.module.about.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
    .controller('testZoneCtrl', ["$scope", function ($scope) {
      $scope.angular = angular;
    }]);

})();

(function() {
	'use strict';
	angular
		.module('com.module.testzone')
		.config(["$stateProvider", function($stateProvider) {
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
		}]);

})();

(function () {
  'use strict';
  angular.module('com.module.users', []);

})();

(function () {
  'use strict';
  angular
    .module('com.module.users')
    .config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {

      // Intercept 401 responses and redirect to login screen
      $httpProvider.interceptors.push(["$q", "$location", "CoreService", function ($q, $location, CoreService) {
        return {
          responseError: function (rejection) {
            if (rejection.status === 401) {
              //$rootScope.currentUser = null;
              // save the current location so that login can redirect back
              $location.nextAfterLogin = $location.path();

              if ($location.path() === '/router' || $location.path() ===
                '/login') {
                console.log('401 while on router on login path');
              } else {
                if ($location.path() !== '/register') {
                  $location.path('/login');
                }
                CoreService.toastWarning('Error 401 received',
                  'We received a 401 error from the API! Redirecting to login'
                );
              }
            }
            if (rejection.status === 404) {
              console.log(rejection);
              CoreService.toastError('Error 404 received', rejection.data
                .error.message);
            }
            if (rejection.status === 422) {
              console.log(rejection);
              CoreService.toastError('Error 422 received', rejection.data
                .error.message);
            }
            if (rejection.status === 0) {
              $location.path('/');
              CoreService.toastError('Connection Refused',
                'The connection to the API is refused. Please verify that the API is running!'
              );
            }
            return $q.reject(rejection);
          }
        };
      }]);
    }]);

})();

(function () {
  'use strict';
  angular.module('com.module.users')
    .run(["$rootScope", "gettextCatalog", function ($rootScope, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Users'), 'app.users.list', 'fa-user');
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.users')
    .config(["$stateProvider", function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          template: '<login></login>',
          controller: 'LoginCtrl'
        })
        .state('register', {
          url: '/register',
          template: '<register></register>',
          controller: 'RegisterCtrl'
        })
        .state('app.users', {
          abstract: true,
          url: '/users',
          templateUrl: 'modules/users/views/main.html'
        })
        .state('app.users.list', {
          url: '',
          templateUrl: 'modules/users/views/list.html',
          controllerAs: 'ctrl',
          controller: ["users", function (users) {
            console.log('users', users);
            this.users = users;
          }],
          resolve: {
            users: ["UserService", function (UserService) {
              console.log('users');
              return UserService.find();
            }]
          }
        })
        .state('app.users.add', {
          url: '/add',
          templateUrl: 'modules/users/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "UserService", "user", function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('add');
            this.formOptions = {};
            this.submit = function () {
              UserService.upsert(this.user).then(function () {
                $state.go('^.list');
              }).catch(function (err) {
                console.log(err);
              });
            };
          }],
          resolve: {
            user: function () {
              return {};
            }
          }
        })
        .state('app.users.edit', {
          url: '/edit/:id',
          templateUrl: 'modules/users/views/form.html',
          controllerAs: 'ctrl',
          controller: ["$state", "UserService", "user", function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('edit');
            this.formOptions = {};
            this.submit = function () {
              UserService.upsert(this.user).then(function () {
                $state.go('^.list');
              });
            };
          }],
          resolve: {
            user: ["$stateParams", "UserService", function ($stateParams, UserService) {
              return UserService.findById($stateParams.id);
            }]
          }
        })
        .state('app.users.view', {
          url: '/view/:id',
          templateUrl: 'modules/users/views/view.html',
          controllerAs: 'ctrl',
          controller: ["user", function (user) {
            this.user = user;
          }],
          resolve: {
            user: ["$stateParams", "UserService", function ($stateParams, UserService) {
              return UserService.findById($stateParams.id);
            }]
          }
        })
        .state('app.users.delete', {
          url: '/:id/delete',
          template: '',
          controller: ["$stateParams", "$state", "UserService", function ($stateParams, $state, UserService) {
            UserService.delete($stateParams.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          }]
        })
        .state('app.users.profile', {
          url: '/profile',
          templateUrl: 'modules/users/views/profile.html',
          controllerAs: 'ctrl',
          controller: ["$state", "UserService", "user", function ($state, UserService, user) {
            this.user = user;
            this.formFields = UserService.getFormFields('edit');
            this.formOptions = {};
            this.submit = function () {
              UserService.upsert(this.user).then(function () {
                $state.go('^.profile');
              });
            };
          }],
          resolve: {
            user: ["User", function (User) {
              return User.getCurrent(function (user) {
                return user;
              }, function (err) {
                console.log(err);
              });
            }]
          }
        });
    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.users.controller:LoginCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $routeParams
   * @requires $location
   * Contrller for Login Page
   **/
  angular
    .module('com.module.users')
    .controller('LoginCtrl', ["$scope", "$routeParams", "$location", "CoreService", "User", "AppAuth", "AuthProvider", "gettextCatalog", function ($scope, $routeParams, $location, CoreService, User, AppAuth, AuthProvider, gettextCatalog) {

      var TWO_WEEKS = 1000 * 60 * 60 * 24 * 7 * 2;

      $scope.credentials = {
        ttl: TWO_WEEKS,
        rememberMe: true
      };

      if (CoreService.env.name === 'development') {
        $scope.credentials.email = 'admin@admin.com';
        $scope.credentials.password = 'admin';
      }

      $scope.schema = [
        {
          label: '',
          property: 'email',
          placeholder: gettextCatalog.getString('Email'),
          type: 'email',
          default: 'lvduit08@gmail.com',
          attr: {
            required: true,
            ngMinlength: 4
          },
          msgs: {
            required: gettextCatalog.getString('You need an email address'),
            email: gettextCatalog.getString('Email address needs to be valid'),
            valid: gettextCatalog.getString('Nice email address!')
          }
        },
        {
          label: '',
          property: 'password',
          placeholder: gettextCatalog.getString('Password'),
          type: 'password',
          default: '123456',
          attr: {
            required: true
          }
        },
        {
          property: 'rememberMe',
          label: gettextCatalog.getString('Stay signed in'),
          type: 'checkbox'
        }
      ];

      $scope.options = {
        validation: {
          enabled: true,
          showMessages: false
        },
        layout: {
          type: 'basic',
          labelSize: 3,
          inputSize: 9
        }
      };

      $scope.socialLogin = function (provider) {
        window.location = CoreService.env.siteUrl + provider.authPath;
      };

      AuthProvider.count(function (result) {
        if (result.count > 0) {
          AuthProvider.find(function (result) {
            $scope.authProviders = result;
          });
        }
      });

      $scope.login = function () {


        $scope.loginResult = User.login({
            include: 'user',
            rememberMe: $scope.credentials.rememberMe
          }, $scope.credentials,
          function (user) {

            console.log(user.id); // => acess token
            console.log(user.ttl); // => 1209600 time to live
            console.log(user.created); // => 2013-12-20T21:10:20.377Z
            console.log(user.userId); // => 1

            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;
            AppAuth.currentUser = $scope.loginResult.user;
            CoreService.toastSuccess(gettextCatalog.getString('Logged in'),
              gettextCatalog.getString('You are logged in!'));
            if (next === '/login') {
              next = '/';
            }
            $location.path(next);

          },
          function (res) {
            $scope.loginError = res.data.error;
          });

      };

    }]);

})();

(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.users.controller:RegisterCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $routeParams
   * @requires $location
   * Controller for Register Page
   **/
  angular
    .module('com.module.users')
    .controller('RegisterCtrl', ["$scope", "$routeParams", "$location", "$filter", "CoreService", "User", "AppAuth", "gettextCatalog", function ($scope, $routeParams, $location, $filter, CoreService, User, AppAuth, gettextCatalog) {

      $scope.registration = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      };

      $scope.schema = [{
        label: '',
        property: 'firstName',
        placeholder: gettextCatalog.getString('First Name'),
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: gettextCatalog.getString(
            'Needs to have at least 4 characters')
        }
      }, {
        label: '',
        property: 'lastName',
        placeholder: gettextCatalog.getString('Last Name'),
        type: 'text',
        attr: {
          ngMinlength: 4,
          required: true
        },
        msgs: {
          minlength: gettextCatalog.getString(
            'Needs to have at least 4 characters')
        }
      }, {
        label: '',
        property: 'email',
        placeholder: gettextCatalog.getString('Email'),
        type: 'email',
        help: gettextCatalog.getString(
          'Don\'t worry we won\'t spam your inbox'),
        attr: {
          required: true,
          ngMinlength: 4
        },
        msgs: {
          required: gettextCatalog.getString('You need an email address'),
          email: gettextCatalog.getString('Email address needs to be valid'),
          valid: gettextCatalog.getString('Nice email address!')
        }
      }, {
        type: 'multiple',
        fields: [{
          label: '',
          property: 'password',
          placeholder: gettextCatalog.getString('Password'),
          type: 'password',
          attr: {
            required: true,
            ngMinlength: 6
          }
        }, {
          label: '',
          property: 'confirmPassword',
          placeholder: gettextCatalog.getString('Confirm Password'),
          type: 'password',
          attr: {
            confirmPassword: 'user.password',
            required: true,
            ngMinlength: 6
          },
          msgs: {
            match: gettextCatalog.getString(
              'Your passwords need to match')
          }
        }],
        columns: 6
      }];

      $scope.options = {
        validation: {
          enabled: true,
          showMessages: false
        },
        layout: {
          type: 'basic',
          labelSize: 3,
          inputSize: 9
        }
      };

      $scope.confirmPassword = '';

      $scope.register = function () {

        $scope.registration.username = $scope.registration.email;
        delete $scope.registration.confirmPassword;
        $scope.user = User.save($scope.registration,
          function () {

            $scope.loginResult = User.login({
                include: 'user',
                rememberMe: true
              }, $scope.registration,
              function () {
                AppAuth.currentUser = $scope.loginResult.user;
                CoreService.toastSuccess(gettextCatalog.getString(
                  'Registered'), gettextCatalog.getString(
                  'You are registered!'));
                $location.path('/');
              },
              function (res) {
                CoreService.toastWarning(gettextCatalog.getString(
                  'Error signin in after registration!'), res.data.error
                  .message);
                $scope.loginError = res.data.error;
              }
            );

          },
          function (res) {
            CoreService.toastError(gettextCatalog.getString(
              'Error registering!'), res.data.error.message);
            $scope.registerError = res.data.error;
          }
        );
      };
    }])
    .directive('confirmPassword',
    function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
          var validate = function (viewValue) {
            var password = scope.$eval(attrs.confirmPassword);
            ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
              viewValue === password);
            return viewValue;
          };
          ngModel.$parsers.push(validate);
          scope.$watch(attrs.confirmPassword, function () {
            validate(ngModel.$viewValue);
          });
        }
      };
    }
  );

})();

(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:login
   * @description
   * # login
   */
  angular
    .module('com.module.users')
    .directive('login', function () {
      return {
        templateUrl: 'modules/users/views/login.html',
        restrict: 'E'
      };
    });

})();

(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:register
   * @description
   * # register
   */
  angular
    .module('com.module.users')
    .directive('register', function () {
      return {
        templateUrl: 'modules/users/views/register.html',
        restrict: 'E'
      };
    });

})();

(function () {
  'use strict';

  /*jshint sub:true*/
  /*jshint camelcase: false */

  angular
    .module('com.module.users')
    .factory('AppAuth', ["$cookies", "User", "LoopBackAuth", "$http", function ($cookies, User, LoopBackAuth, $http) {
      var self = {
        login: function (data, cb) {
          LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
          $http.post('/api/users/login?include=user', {
            email: data.email,
            password: data.password
          })
            .then(function (response) {
              if (response.data && response.data.id) {
                LoopBackAuth.currentUserId = response.data.userId;
                LoopBackAuth.accessTokenId = response.data.id;
              }
              if (LoopBackAuth.currentUserId === null) {
                delete $cookies['accessToken'];
                LoopBackAuth.accessTokenId = null;
              }
              LoopBackAuth.save();
              if (LoopBackAuth.currentUserId && response.data && response.data
                  .user) {
                self.currentUser = response.data.user;
                cb(self.currentUser);

              } else {
                cb({});
              }
            }, function () {
              console.log('User.login() err', arguments);
              LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                null;
              LoopBackAuth.save();
              cb({});
            });
        },

        logout: function (cb) {
          //Destroy the access token.
          User.logout({"access_token": LoopBackAuth.accessTokenId}, function () {
            //Destory both cookies that get created.
            delete $cookies["access_token"];
            delete $cookies["accessToken"];
            //Perform the Passport Logout
            $http.post('/auth/logout');

          });
          self.currentUser = null;
          cb();
        },

        ensureHasCurrentUser: function (cb) {
          if ((!this.currentUser || this.currentUser.id === 'social') && $cookies.accessToken) {
            LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
            $http.get('/auth/current')
              .then(function (response) {
                if (response.data.id) {
                  LoopBackAuth.currentUserId = response.data.id;
                  LoopBackAuth.accessTokenId = $cookies.accessToken.substring(
                    2, 66);
                }
                if (LoopBackAuth.currentUserId === null) {
                  delete $cookies['accessToken'];
                  LoopBackAuth.accessTokenId = null;
                }
                LoopBackAuth.save();
                self.currentUser = response.data;
                var profile = self.currentUser && self.currentUser.profiles &&
                  self.currentUser.profiles.length && self.currentUser.profiles[
                    0];
                if (profile) {
                  self.currentUser.name = profile.profile.name;
                }
                cb(self.currentUser);
              }, function () {
                console.log('User.getCurrent() err', arguments);
                LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                  null;
                LoopBackAuth.save();
                cb({});
              });
          } else {
            if(self.currentUser){
              console.log('Using cached current user.');
            }
            cb(self.currentUser);
          }
        }
      };
      return self;
    }]);

})();

(function () {
  'use strict';
  angular
    .module('com.module.users')
    .service('UserService', ["$state", "CoreService", "User", "gettextCatalog", function ($state, CoreService, User, gettextCatalog) {

      this.find = function () {
        return User.find().$promise;
      };

      this.findById = function (id) {
        return User.findById({
          id: id
        }).$promise;
      };

      this.upsert = function (user) {
        return User.upsert(user).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('User saved'),
              gettextCatalog.getString('Your user is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving user '),
              gettextCatalog.getString('This user could no be saved: ' + err)
            );
          }
        );
      };

      this.delete = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            User.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('User deleted'),
                gettextCatalog.getString('Your user is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting user'),
                gettextCatalog.getString('Your user is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };


      this.getFormFields = function (formType) {
        var form = [
          {
            key: 'username',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Username'),
              required: true
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Email'),
              required: true
            }
          },
          {
            key: 'firstName',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Last name'),
              required: true
            }
          },
          {
            key: 'lastName',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Last name'),
              required: true
            }
          }
        ];
        if (formType === 'add') {
          form.push({
            key: 'password',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Password'),
              required: true
            }
          });
        }
        return form;
      };

    }]);

})();
