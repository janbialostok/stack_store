'use strict';

app.factory('CurrentFactory', function($http) {
	var factory = {};

	factory.getCurrentUser = function() {
		$http.get('/session')
		.then(function(response) {
			return response.data.user;
		});
	};

	factory.updateCurrentUser = function() {
		factory.getCurrentUser().then(function(user) {
			factory.current.user = user;
		}).catch(function(err) {
			factory.current.user = {};
		});
	};

	factory.current = {
		user: {}
	};


	return factory;
});