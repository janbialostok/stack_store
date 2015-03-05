'use strict';

app.factory('loginFactory', function($http, CurrentFactory) {
	var factory = {};

	factory.localLogin = function(user) {
		return $http.post('/auth/login', user);
	};
	
	factory.logout = function() {
		return $http.get('/logout').then(function() {
			CurrentFactory.current.user = {};
		});
	};

	return factory;
});