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
		$scope.unAuthorized = false;
		loginFactory.localLogin(user).then(function(user) {
			$state.go('home');
		}).catch(function(err) {
			$scope.unAuthorized = true;
		});
	};

	$scope.createUser = function(user) {
		loginFactory.createUser(user).then(function(createdUser){
			return loginFactory.localLogin({username: user.name , password: user.password});
		}).then(function() {
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
