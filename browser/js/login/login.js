'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});
});

app.controller('LoginCtrl', function($scope, loginFactory, $state) {
	$scope.unAuthorized = false;

	$scope.login = function(user) {
		loginFactory.localLogin(user).then(function(response) {
			if (response.status == 200) {
				$scope.current.user = response.data.user;
				$state.go('home');
			} else {
				$state.unAuthorized = true;
				// show error
			}
		});
	}

});