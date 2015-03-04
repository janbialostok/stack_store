"use strict";
app.directive("catMenu", function(SideBarFactory){
	return {
	restrict: 'E',
	templateUrl: 'js/common/directives/categorymenu/catMenu.html',
	link: function($scope, elem, attr){
	    $scope.categories = [
			{ 
			    text: SideBarFactory.male.text,
			    qValue: SideBarFactory.male.text,
			    topTypes: [],
			    bottomTypes: []
			},
			{
			    text: SideBarFactory.female.text,
			    qValue: SideBarFactory.female.text,
			    topTypes: [],
			    bottomTypes: []
			},
			{
			    text: SideBarFactory.children.text,
			    qValue: SideBarFactory.children.text,
			    topTypes: [],
			    bottomTypes: []
			}
	    ];
	    for (var key in SideBarFactory.male.tops){
		$scope.categories[0].topTypes.push(SideBarFactory.male.tops[key]);
		$scope.categories[1].topTypes.push(SideBarFactory.female.tops[key]);
		$scope.categories[2].topTypes.push(SideBarFactory.children.tops[key]);
	    };
	    for (var key in SideBarFactory.male.bottoms){
		$scope.categories[0].bottomTypes.push(SideBarFactory.male.bottoms[key]);
		$scope.categories[1].bottomTypes.push(SideBarFactory.female.bottoms[key]);
		$scope.categories[2].bottomTypes.push(SideBarFactory.children.bottoms[key]);
    	};
	}
    };
});