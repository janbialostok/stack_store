'use strict';

app.factory('ItemFactory', function($http) {
    var factory = {};
    factory.getAllItems = function(){
	return $http.get('/api/item/findAll').then(function (res){
	    return res.data;
	});
    };
    factory.getByCategory = function(tags) {
	return $http.get('/api/item/findBy/category/' + tags)
	    .then(function(res) {
		return res.data;
	    });
    };
    factory.getItem = function (productId){
	return $http.get('/api/item/' + productId).then(function (res){
	    return res.data;
	});
    };
    factory.getBySearchString = function(searchStr) {
	return $http.get('/api/item/findBy/search/' + searchStr)
	    .then(function(res) {
		return res.data;
	    });
    };
    factory.getByUser = function(userId) {
	return $http.get("/api/item/findBy/user/" + userId)
	    .then(function(res) {
		return res.data;
	    });
    };
    factory.deleteItem = function(productId) {
	return $http.delete("/api/item/" + productId);
    };
    factory.addItem = function(item) {
    	return $http.post('/api/item/create', item).then(function(res) {
    		return res.data;
    	});
    };
    factory.updateItem = function(item) {
    	return $http.put('/api/item/' + item._id, item).then(function(res) {
    		console.log(res);
    		return res.data;
    	});
    };
    factory.updateInventory = function(itemId, quantity) {
        return $http.put('/api/item/update/' + itemId + '/inventory', { quantity: quantity }).then(function (res){
            return res.data;
        });
    }
    
    return factory;
});
