'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('addItem', {
		url: '/addItem',
		controller: 'AddItemCtrl',
		templateUrl: 'js/additem/additem.html'
	});
});

app.controller('AddItemCtrl', function($scope, CurrentFactory, $state) {
	if (!CurrentFactory.current.user.permLevel
		|| CurrentFactory.current.user.permLevel === 'Guest')
		$state.go('home');

	
});