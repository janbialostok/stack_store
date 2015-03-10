'use strict';

app.factory('UserFactory', function($http, loginFactory) {
	var factory = {};
	factory.getUserById = function (userId){
		return $http.get('/api/user/' + userId).then(function (res){
			return res.data;
		});
	};
	factory.getSellerId = function (productId, userId){
		return $http.get('/api/item/' + productId + '/user/' + userId).then(function (res){
			return res.data.sellerID;
		});
	};
	factory.updateUser = function(user) {
		return $http.put('/api/user/' + user._id, user).then(function(res) {
			return res.data;
		});
	};
	factory.makeUnauthorizedUser = function() {
		return $http.post('/api/user/signupGuest').then(function(res) {
			return res.data;
		}).then(function(user) {
			return loginFactory.localLogin({username: user.name, password: 'temp'});
		});
	};
	factory.saveAddressOnUser = function (user, address){
		return $http.put('/api/user/' + user._id + '/save/address', address).then(function (res){
			return res.data;
		});
	};
	factory.convertToOrder = function (user, cart){
		return $http.put('/api/user/' + user._id + '/order', cart).then(function (res){
			return res.data;
		});
	};
	return factory;
});