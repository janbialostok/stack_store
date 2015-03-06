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

	factory.createUser = function (user) {
		user.authType = 'Registered User';
		return $http.post('/api/user/signup',user)
	}

	return factory;
});