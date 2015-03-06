'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('userSettings', {
		url: '/settings',
		controller: 'SettingCtrl',
		templateUrl: 'js/login/settings/settings.html'
	});
});

app.controller('SettingCtrl', function($scope, CurrentFactory) {

});