'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('manageUsers', {
		url: '/manageUsers',
		controller: 'ManageUserCtrl',
		templateUrl: 'js/superuser/manageusers/manageusers.html'
	});
});

app.controller('ManageUserCtrl', function($scope, UserFactory) {
	UserFactory.getAllUsers({ permLevel: 'Super User' })
	.then(function(users) {
		$scope.users = users;
		return UserFactory.getAllUsers({ permLevel: 'Registered User' });
	}).then(function(users) {
		$scope.users = $scope.users.concat(users);
	});
});