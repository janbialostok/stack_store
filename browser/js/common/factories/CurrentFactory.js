'use strict';

app.factory('CurrentFactory', function($http, AuthService, CartFactory, $q, $cookies) {
	var factory = {};

	factory.current = {
		user: null
	};

	factory.updateCurrentUser = function() {
		return AuthService.getLoggedInUser().then(function(user) {
			if (!user) user = {};
			if (user.cart) {
				return factory.updateCartSize(user);
			} else {
				user.cart = '';
				user.cartSize = 0;
				if ($cookies.tempCartId) return factory.updateCartSize(user);
				else return user;
			}
		}).then(function(user) {
			factory.current.user = user;
			return user;
		});
	};

	factory.updateCartSize = function(user) {
		return factory.manageCart(user).then(function(user) {
			return CartFactory.getCartSize(user.cart);
		}).then(function(size) {
			user.cartSize = size;
			return user;
		});
	};

	factory.manageCart = function(user) {
		var tempCartId = $cookies.tempCartId;
		return $q(function(resolve, reject) {
			if (user.permLevel === 'Guest') {
				$cookies.tempCartId = user.cart;
				resolve(user);
			} else if (user && tempCartId) {
				CartFactory.mergeCartTo(user._id, tempCartId)
				.then(function(user) {
					delete $cookies.tempCartId;
					resolve(user);
				});
			} else resolve(user);
		});
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