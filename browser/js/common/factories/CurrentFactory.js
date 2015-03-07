'use strict';

app.factory('CurrentFactory', function($http, AuthService, CartFactory) {
	var factory = {};

	factory.updateCurrentUser = function() {
		return AuthService.getLoggedInUser().then(function(data) {
			if (data) {
				return CartFactory.getCartSize(data.cart).then(function(size) {
					data.cartSize = size;
					return data;
				});
			} else return data;
		}).then(function(data) {
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
	};

	return factory;
});