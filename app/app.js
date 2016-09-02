'use strict';

var app = angular.module('Blog', [
    'kinvey',
    'ngRoute',
    'ngToast',
    'angular-loading-bar'
]);

app.constant('guestUser', {
	username: 'guestUser',
	password: '123456',
	authToken: 'de122d89-1d92-4171-8c24-1a6d4d4cf0ff.wyJJylhORGkKFVYNCygFHWq24/GpN6UxR3prM5tW4rY='
});

app.config([
    '$routeProvider',
    '$kinveyProvider',
    'ngToastProvider',
    function($routeProvider, $kinveyProvider, ngToastProvider) {

    	ngToastProvider.configure({
    		additionalClasses: 'animated slideInRight'
  		});

        $kinveyProvider.init({
            appKey: 'kid_SJ6T9biK',
            appSecret: '12252e17f1184a3d8ef9e58db379fa04'
        });

        $routeProvider.when('/', {
            templateUrl: 'components/home/home.html',
            controller: 'UserController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'components/user/login/login.html',
            controller: 'UserController'
        });

        $routeProvider.when('/register', {
            templateUrl: 'components/user/register/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/forget-password', {
            templateUrl: 'components/user/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/new-post', {
            templateUrl: 'components/home/new-post.html',
            controller: 'NewPostController'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);

app.run(['$kinvey', 'userService', function($kinvey, userService) {

	let promise = $kinvey.ping();
    promise.then(function(response) {
        console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
    }, function(error) {
        console.log('Kinvey Ping Failed. Response: ' + error.description);
    });

    let isLoggedIn =  userService.isLoggedIn();
    
	if (!isLoggedIn) {
		console.log("triggered");
	}

    
}])
