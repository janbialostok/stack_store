'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});

	$stateProvider.state('createUserAccount', {
		url: '/createUserAccount',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/createUserAccount.html'
	});
});

app.controller('LoginCtrl', function($scope, loginFactory, $state, $window) {
	$scope.unAuthorized = false;

	$scope.login = function(user) {
		loginFactory.localLogin(user).then(function(response) {
			if (response.status === 200) {
				$scope.current.user = response.data.user;
				$state.go('home');
			} else {
				$state.unAuthorized = true;
				// show error
			}
		});
	};

	$scope.createUser = function(user) {

	};

	$scope.googleLogin = function() {
		$window.location.href = '/auth/google';
	};

	$scope.facebookLogin = function() {
		$window.location.href = '/auth/facebook';
	};

});
