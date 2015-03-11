'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('category', {
		url: '/category/:tags',
		controller: 'CategoryCtrl',
		templateUrl: 'js/category/category.html'
	});
});

app.controller('CategoryCtrl', function($scope, $stateParams, ItemFactory) {
	$scope.categoryTags = $stateParams.tags;

	ItemFactory.getByCategory($scope.categoryTags).then(function(items) {
		$scope.items = items;
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