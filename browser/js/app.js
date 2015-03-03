'use strict';
var app = angular.module('StackStoreApp', ['ui.router', 'fsaPreBuilt']);

app.controller('MainController', function ($scope) {
    $scope.currentUser = {
    	permissionLevel: "auth",
    	cart: {
    		num: 5
    	},
    	username: "username"
    };

    $scope.item = {
        img: 'http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$',
        name: 'Blue Jeans',
        price: 200
    };
});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});