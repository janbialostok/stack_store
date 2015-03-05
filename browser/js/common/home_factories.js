"use strict";
app.factory("GetDataFactory", function($http) {
    return {
	getAllStoreData: function() {
	    return $http.get("/").then(function(data) {
		return data;
	    });   
	}	
    };	    
});