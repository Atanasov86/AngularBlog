'use strict';

app.controller('AppController', [
    '$scope',
    '$location',
    'userService',
    'postService',
    'ngToast',
    function($scope, $location, userService, postService, ngToast) {
        // Put the authService in the $scope to make it accessible from all screens
        $scope.userService = userService;

        $scope.getAllPosts = function() {
            postService.getAllPosts()
                .then(function(response) {
                    $scope.posts = response;
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.logout = function() {
            userService.logout()
                .then(function() {
                    userService.clearUserCredentials();
                    ngToast.success('You are successfully logout.');
                    $location.path('/posts');
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.getAllPosts();
    }
]);
