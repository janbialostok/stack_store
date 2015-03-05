'use strict';

app.factory('loginFactory', function($http, CurrentFactory, AuthService) {
	var factory = {};

	factory.localLogin = function(user) {
		return AuthService.login(user)
			.then(CurrentFactory.updateCurrentUser);
	};
	
	factory.logout = function() {
		return AuthService.logout()
			.then(CurrentFactory.updateCurrentUser);

	};

	return factory;
});