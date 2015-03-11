'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'js/home/home.html'
	});
});

app.controller('HomeCtrl', function($scope, ItemFactory) {
    ItemFactory.getAllItems().then(function(data) {
		$scope.allItems = data;
    });

    function updateSizebar() {
		var width = window.innerWidth;
    	if (width < 992) $scope.showSidebar = false;
    	else $scope.showSidebar = true;
    }
    updateSizebar();


    $(window).resize(function() {
    	updateSizebar();
    	$scope.$apply();
    });
});
