'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'js/home/home.html'
	});
});

app.controller('HomeCtrl', function($scope, ItemFactory) {
    $scope.allItems;

    ItemFactory.getAllItems().then(function(data) {
		$scope.allItems = data;
    });
});
