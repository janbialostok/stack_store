'use strict';

app.factory('ItemFactory', function($http) {
    var factory = {};
    factory.getAllItems = function(){
        return $http.get('/api/item/findAll').then(function (res){
            return res.data;
        });
    };
    return factory;
});