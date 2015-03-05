'use strict';

app.factory('loginFactory', function($http) {
	var factory = {};

	factory.localLogin = function(user) {
		return $http.post('/auth/login', user);
	}

	return factory;
});