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

	factory.cloneCurrentUser = function() {
		var obj = {};
		for (var key in factory.current.user) {
			obj[key] = factory.current.user[key];
		}
		return obj;
	}

	return factory;
});