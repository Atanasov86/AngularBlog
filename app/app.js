'use strict';

var app = angular.module('Blog', [
    'kinvey',
    'ngRoute',

]);

app.config(['$routeProvider', '$kinveyProvider', function($routeProvider, $kinveyProvider) {

    $kinveyProvider.init({
        appKey: 'kid_SJ6T9biK',
        appSecret: '12252e17f1184a3d8ef9e58db379fa04'
    });

    $routeProvider.when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
    	templateUrl: 'components/user/login/login.html',
    	controller: 'UserController'
    });

    $routeProvider.when('/register', {
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
}]);

app.run(['$kinvey', function($kinvey) {
    var promise = $kinvey.ping();
    promise.then(function(response) {
        console.log('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
    }, function(error) {
        console.log('Kinvey Ping Failed. Response: ' + error.description);
    });
}])
