'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('manageUsers', {
		url: '/manageUsers',
		controller: 'ManageUserCtrl',
		templateUrl: 'js/superuser/manageusers/manageusers.html'
	});
});

app.controller('ManageUserCtrl', function($scope, UserFactory) {
	UserFactory.getAllUsers().then(function(users) {
		$scope.users = users;
	});
});