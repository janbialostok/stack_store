'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});
});

app.controller('LoginCtrl', function($scope, loginFactory, $state, $window, CurrentFactory) {
	$scope.unAuthorized = false;

	$scope.login = function(user) {
		loginFactory.localLogin(user).then(function(user) {
			$state.go('home');
		});
	};

	$scope.googleLogin = function() {
		$window.location.href = '/auth/google';
	};

	$scope.facebookLogin = function() {
		$window.location.href = '/auth/facebook';
	};
});