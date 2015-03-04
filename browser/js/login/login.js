'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});
});

app.controller('LoginCtrl', function($scope, loginFactory, $state) {
	$scope.login = function(user) {
		loginFactory.localLogin(user).then(function() {
			$state.go('home');
		});
	}

});