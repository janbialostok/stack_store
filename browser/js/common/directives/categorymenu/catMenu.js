"use strict";

app.directive("categoryMenu", function(CategoryFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categorymenu/catMenu.html',
		scope: {
			horiz: '=?'
		},
		link: function(scope, elem, attr){
			scope.categories = CategoryFactory.categories_asArrLike;
		}
	};
});

app.directive("categoryItem", function($compile){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categorymenu/categoryItem.html',
		scope: {
			item: '='
		},
		link: function(scope, elem, attr) {
			if (scope.item.children.length) {
				var appendElem = '<category-collection collection="item.children">'
								+ '</collection>';

				$compile(appendElem)(scope, function(cloned, scope) {
					elem.append(cloned);
				});
			}
		}
	};
});

app.directive('categoryCollection', function() {
	return {
		restrict: 'E',
		scope: {
			collection: '='
		},
		templateUrl: 'js/common/directives/categorymenu/categoryCollection.html'
	};
});

app.directive('stopPropagation', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr) {
            elem.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});