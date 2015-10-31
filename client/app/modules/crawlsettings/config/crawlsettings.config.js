(function() {
    'use strict';
    angular
        .module('com.module.crawlsettings')
        .run(function($rootScope, gettextCatalog, CrawlSetting) {
            $rootScope.addMenu(gettextCatalog.getString('Crawler Settings'), 'app.crawlsettings.list', 'fa-cog');
        });
})();
