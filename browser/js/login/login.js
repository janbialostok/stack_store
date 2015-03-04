'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});

	$stateProvider.state('login.local', {
		url: '/local',
		templateUrl: 'js/login/local/local.html',
		controller: 'LoginLocalCtrl'
	});

	$stateProvider.state('login.google', {
		url: '/google',
		templateUrl: 'js/login/google/google.html',
		controller: 'LoginGoogleCtrl'
	});

	$stateProvider.state('login.facebook', {
		url: '/facebook',
		templateUrl: 'js/login/facebook/facebook.html',
		controller: 'LoginFacebookCtrl'
	});
});

app.controller('LoginCtrl', function($scope) {
	$scope.loginOptions = ['local', 'google', 'facebook'];
});