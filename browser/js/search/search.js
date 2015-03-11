'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('search', {
		url: '/search/:searchString',
		controller: 'SearchCtrl',
		templateUrl: 'js/search/search.html'
	});
});

app.controller('SearchCtrl', function($scope, $stateParams, ItemFactory) {
	$scope.searchString = $stateParams.searchString;

	ItemFactory.getBySearchString($scope.searchString).then(function(items) {
		$scope.searchResults = items;
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