"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiUrl:'http://0.0.0.0:3000/api/',siteUrl:'http://0.0.0.0:3000',serverConfig:{restApiRoot:'/api',host:'0.0.0.0',port:3000,url:'http://localhost:3000/',cookieSecret:'F1FEE670-3C72-11E4-916C-0800200C9A66',legacyExplorer:true,eventServerUrl:'http://prediction.duyetdev.com:7070',eventServerAccessToken:'VrDubNB7Onlla92acTxanlWjYcvMTtoOtgV2u5nw4IGpgww2ISqU5nGFWVmS5IP4'}})

;