'use strict';

var app = angular.module('Blog', [
    'ngRoute',
    'ngToast',
    'angular-loading-bar',
    'ngSanitize',
    'ngStorage',
    'ngTagsInput',
    'textAngular'
]);

app.constant('BASE_URL', 'https://baas.kinvey.com/');
app.constant('KINVEY_PARAMS', {
    appKey: 'kid_SJ6T9biK',
    appSecret: '12252e17f1184a3d8ef9e58db379fa04'
});
app.constant('guestUser', {
    username: 'guestUser',
    password: '123456',
    authToken: '6527a796-237e-4322-b6a6-09b06da09eae.glQOTvT/4fscRFZJ4Jmxl2k9eZpBzFNS8rACDEiEFQs='
});

app.config([
    '$routeProvider',
    'ngToastProvider',
    function($routeProvider, ngToastProvider) {

        ngToastProvider.configure({
            additionalClasses: 'animated slideInRight'
        });

        $routeProvider.when('/posts', {
            templateUrl: 'app/views/home.html',
            controller: 'PostController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'app/views/user/login.html',
            controller: 'UserController'
        });

        $routeProvider.when('/register', {
            templateUrl: 'app/views/user/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/profile', {
            templateUrl: 'app/views/user/profile.html',
            controller: 'UserController'
        });

        $routeProvider.when('/change-password', {
            templateUrl: 'app/views/user/change-password.html',
            controller: 'UserController'
        });

        $routeProvider.when('/forget-password', {
            templateUrl: 'app/views/user/forget-password.html',
            controller: 'UserController'
        });

        $routeProvider.when('/admin-panel', {
            templateUrl: 'app/views/admin/admin-panel.html',
            controller: 'AdminController'
        });

        $routeProvider.when('/new-post', {
            templateUrl: 'app/views/post/create-post.html',
            controller: 'PostController'
        });

        $routeProvider.when('/post/:id', {
            templateUrl: 'app/views/post/post.html',
            controller: 'ViewPostController'
        });

        $routeProvider.when('/post/category/:id', {
            templateUrl: 'app/views/post/post.html',
            controller: 'PostController'
        });

        $routeProvider.when('/post/tag/:id', {
            templateUrl: 'app/views/post/post.html',
            controller: 'PostController'
        });

        $routeProvider.otherwise({
            redirectTo: '/posts'
        });
    }
]);

app.run([
    '$rootScope',
    'userService',
    '$location',
    function($rootScope, userService, $location) {

        $rootScope.$on('$locationChangeStart', function() {
            //check if user is logged
            if ((userService.isLoggedIn() && $location.path().indexOf('/login') === 1) &&
                (userService.isLoggedIn() && $location.path().indexOf('/register') === 1)) {
                $location.path('/');
            }

            // if (userService.isLoggedIn() ||
            //     !userService.isAdmin() ||
            //     $location.path().indexOf('/admin-panel') === 1) {
            //     $location.path('/');
            // }
        });
    }
]);
