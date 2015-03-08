'use strict';

app.factory('CurrentFactory', function($http, AuthService, CartFactory) {
	var factory = {};

	factory.updateCurrentUser = function() {
		return AuthService.getLoggedInUser().then(function(user) {
			if (user) {
				console.log('user on session:', user);
				console.log('cart of user:', user.cart);
				if (user.cart) {
					return CartFactory.getCartSize(user.cart).then(function(size) {
						user.cartSize = size;
						return user;
					});
				} else {
					user.cart = '';
					user.cartSize = 0;
					return user;
				}
			} else return user;
		}).then(function(user) {
			factory.current.user = user;
			return user;
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