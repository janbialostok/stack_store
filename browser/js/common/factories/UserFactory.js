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
	factory.getAllUsers = function(options) {
		return $http.get('/api/user/findAll', {params: options}).then(function(res) {
			return res.data;
		});
	};

	return factory;
});