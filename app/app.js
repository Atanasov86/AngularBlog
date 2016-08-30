'use strict';

var app = angular.module('Blog', [
    'ngRoute',
]);

app.config(['$routeProvider' , function($routeProvider) {

	// $routeProvider.when('/', {
	// 		templateUrl: 'compenets/home/homeView.html',
	// 		controller: HomeController
	// 	});

	$routeProvider.otherwise({
            redirectTo: '/'
        });
}]);

           
