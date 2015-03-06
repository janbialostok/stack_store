'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'js/home/home.html'
	});
});

app.controller('HomeCtrl', function($scope, GetDataFactory) {
    GetDataFactory.getAllStoreData().then(function(data) {
		$scope.allItems = data;
    });
});
