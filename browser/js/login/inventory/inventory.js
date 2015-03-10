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

    var getAllInventory = function() {
		return ItemFactory.getByUser($scope.currentUser._id).then(function(items) {
			$scope.inventory = items;
		});	
    };
    
    $scope.deleteInventoryItem = function(item) {
		ItemFactory.deleteItem(item._id).then(getAllInventory());
    };

    getAllInventory();
});
