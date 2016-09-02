'use strict';

app.controller('UserController', [
    '$scope',
    'userService',
    '$location',
    'ngToast',
    function($scope, userService, $location, ngToast) {

    	$scope.userService = userService;

        $scope.singIn = function(user) {
            userService.login(user)
                .then(function(response) {
                	ngToast.success('Login successfully.');
                	$location.path('/');                    
                }, function(err) {
                    ngToast.danger(err);
                })
        };

        $scope.singInWithFacebook = function () {
        	userService.loginWithFacebook()
        		.then(function (user){
        			console.log(user);
        			ngToast.success("You are successfully login.")
        		}, function (err){
        			ngToast.danger(err.message);
        		})
        };

        $scope.singInWithGooglePlus = function () {
        	userService.loginWithGooglePlus()
        		.then(function (user){
        			console.log(user);
        			ngToast.success("You are successfully login.")
        		}, function (err){
        			ngToast.danger(err.message);
        		})
        }

        $scope.singUp = function(user) {        	
        	delete user.confirmPassword;

        	userService.register(user)
        		.then(function (response){
        			ngToast.success('Register successfully.');
        			$location.path('/');        			
        		}, function (err){
        			ngToast.danger(err);
        		})
        };

        $scope.logout = function() {
        	userService.logout()
        		.then(function (user){        		      			
        			ngToast.success('You are successfully logout.');
        			$location.path('/');        			
        		}, function (err){
        			ngToast.danger(err);
        		})
        };       
    }
])
