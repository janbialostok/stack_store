'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'js/login/login.html'
	});
});

app.controller('LoginCtrl', function($scope) {

});