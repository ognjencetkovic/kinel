'use strict';

angular.module('qn', ['qn.services.api', 'qn.questionnaireBuilderController']);

var app = angular.module('app', [
    'qn',
    'qn.text',
    'qn.yesNo',
    'qn.singleChoice',
    'qn.multipleChoice',
    'qn.pageDivider'
]);

app.config(function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });
})

app.config(['$httpProvider', '$compileProvider', function ($httpProvider, $compileProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
}]);