'use strict';

app.controller('UserController', [
    '$scope',
    'userService',
    '$location',
    'ngToast',
    function($scope, userService, $location, ngToast) {

        $scope.login = function(user) {
            userService.login(user)
                .then(function(response) {
                    userService.setUserCredentials(response);
                    $location.path('/posts');
                    ngToast.success('Login successful.');
                }, function(err) {
                    ngToast.danger(err.description);
                });
        };

        $scope.register = function(user) {
            delete user.confirmPassword;

            //set default roles
            user.roles = 'user';
            user.fullName = user.firstName + " " + user.lastName;

            userService.register(user)
                .then(function() {
                    ngToast.success('Register successfully.');
                    $location.path('/login');
                }, function(err) {
                    ngToast.danger(err.description);
                });
        };

        $scope.resetPassword = function(email) {
            userService.resetPassword(email)
                .then(function() {
                    ngToast.success('Please check your email for password and then login with new password');
                    $location.path('/login');
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.singInWithFacebook = function() {
            userService.loginWithFacebook()
                .then(function(user) {
                    console.log(user);
                    ngToast.success("You are successfully login.");
                }, function(err) {
                    ngToast.danger(err.message);
                });
        };
        //
        // $scope.singInWithGooglePlus = function () {
        //     userService.loginWithGooglePlus()
        //         .then(function (user) {
        //             console.log(user);
        //             ngToast.success("You are successfully login.")
        //         }, function (err) {
        //             ngToast.danger(err.message);
        //         })
        // };
    }
]);
