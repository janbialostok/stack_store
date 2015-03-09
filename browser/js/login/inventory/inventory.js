"use strict";

app.config(function($stateProvider) {
    $stateProvider.state("inventory", {
	url: "/inventory",
	controller: "InventoryCtrl",
	templateUrl: "js/login/inventory/inventory.html"
    });
});

app.controller("InventoryCtrl", function($scope, CurrentFactory, ItemFactory) {
    
});
