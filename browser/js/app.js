'use strict';
var app = angular.module('StackStoreApp', ['ui.router', 'fsaPreBuilt', 'ngCookies']);

app.controller('MainController', function ($scope) {


});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

app.run(function(CurrentFactory) {
    // Check session and update current user
    CurrentFactory.updateCurrentUser().then(function(user) {
    });
});