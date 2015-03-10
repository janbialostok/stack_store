'use strict';

app.factory('CreditFactory', function($http) {
	var factory = {};
	factory.processPayment = function(status, response, userId, total){
		return $http.post('/api/user/' + userId + '/pay', { token: response.id , total: total})
			.then(function(res){
				return res.data;
			})
	};
	return factory;
});