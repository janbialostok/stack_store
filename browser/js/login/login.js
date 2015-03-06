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
	$scope.unAuthorizedForm = false;

	$scope.login = function(user) {
		$scope.unAuthorizedForm = false;
		loginFactory.localLogin(user).then(function(user) {
			$state.go('home');
		}).catch(function(err) {
			$scope.unAuthorized = true;
			$scope.unAuthorizedForm = true;
		});
	};

	$scope.createUser = function(user) {
		loginFactory.createUser(user).then(function(createdUser){
			loginFactory.localLogin({username: user.name , password: user.password});
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
