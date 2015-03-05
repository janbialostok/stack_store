'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'js/home/home.html'
	});
});

app.factory("GetDataFactory", function($http) {
    return {
	getAllStoreData: function() {
	    return $http.get("/").then(function(data) {
		return data;
	    });   
	}	
    };	    
});

app.controller('HomeCtrl', function($scope, GetDataFactory) {
    $scope.allItems;

    GetDataFactory.getAllStoreData().then(function(data) {
	$scope.allItems = data;
	console.log(data);
    });
});
