"use strict";

app.config(function($stateProvider) {
    $stateProvider.state("user", {
	url: "/user/:id/allitems",
	controller: "UserCtrl",
	templateUrl: "js/user/user.html"
    });
});

app.controller("UserCtrl", function($scope, $stateParams, ItemFactory, UserFactory) {
    $scope.id = $stateParams.id;

    UserFactory.getUserById($scope.id).then(function(user) {
	ItemFactory.getByUser($scope.id).then(function(items) {
	    $scope.itemsByUser = items;
	    $scope.username = user.name;
	});	
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
