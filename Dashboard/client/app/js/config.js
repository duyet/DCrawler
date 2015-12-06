"use strict";

 angular.module('config', [])

.constant('ENV', {name:'development',apiUrl:'http://0.0.0.0:3000/api/',siteUrl:'http://0.0.0.0:3000',serverConfig:{restApiRoot:'/api',host:'0.0.0.0',port:3000,url:'http://localhost:3000/',cookieSecret:'F1FEE670-3C72-11E4-916C-0800200C9A66',legacyExplorer:true,eventServerUrl:'http://prediction.duyetdev.com:7070',eventServerAccessToken:'52tqySci6f6177421PsPj6S1KjKxO2V5flGLIIJGBEHHQQ9jD5MgseR9ZHwdXoR6'}})

;