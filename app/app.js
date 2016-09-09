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
	authToken: '6527a796-237e-4322-b6a6-09b06da09eae.glQOTvT/4fscRFZJ4Jmxl2k9eZpBzFNS8rACDEiEFQs='
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
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'app/components/user/login/login.html',
            controller: 'UserController'
        });

        $routeProvider.when('/register', {
            templateUrl: 'app/components/user/register/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/profile', {
            templateUrl: 'app/components/user/profile/profile.html',
            controller: 'UserController'
        });

        $routeProvider.when('/forget-password', {
            templateUrl: 'app/components/user/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/new-post', {
            templateUrl: 'app/components/post/create-post.html',
            controller: 'PostController'
        });

        $routeProvider.when('/post/:id', {
            templateUrl: 'app/components/post/post.html',
            controller: 'PostController'
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
		// $kinvey.User.login('guestUser', '123456');
		console.log("triggered");
	}    
}]);
