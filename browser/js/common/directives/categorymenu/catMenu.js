"use strict";

app.directive("categoryMenu", function(CategoryFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categorymenu/catMenu.html',
		scope: {
		},
		link: function(scope, elem, attr){
			scope.horiz = true;
			scope.categories = CategoryFactory.categories_asArrLike;
		}
	};
});

app.directive("categoryItem", function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categorymenu/categoryItem.html',
		scope: {
			item: '='
		},
		link: function(scope, elem, attr) {
			scope.hasChildren = !!scope.item.children.length;
		}
	};
});