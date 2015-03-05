'use strict';

app.factory('CurrentFactory', function($http, AuthService) {
	var factory = {};

	factory.updateCurrentUser = function() {
		return AuthService.getLoggedInUser().then(function(data) {
			factory.current.user = data;
			return data;
		});
	};

	factory.current = {
		user: null
	};


	return factory;
});