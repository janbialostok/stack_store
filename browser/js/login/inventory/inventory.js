"use strict";

app.config(function($stateProvider) {
    $stateProvider.state("inventory", {
	url: "/inventory",
	controller: "InventoryCtrl",
	templateUrl: "js/login/inventory/inventory.html"
    });
});

app.controller("InventoryCtrl", function($scope, CurrentFactory, ItemFactory) {
    $scope.currentUser = CurrentFactory.current.user;

    ItemFactory.getByUser($scope.currentUser._id).then(function(items) {
	$scope.inventory = items;
    });
});
