'use strict';

app.controller("HomeController", [
	'$scope',
	'postService',
    'userService',
	'$location',
	'ngToast',	
	function($scope, postService, userService, $location, ngToast){

        $scope.userService = userService;

		$scope.getPosts = function () {
            postService.getAllPosts()
                .then(function (response) {
                    $scope.posts = response;
                }, function (err) {
                    ngToast.danger(err.description);
                });
        };

        $scope.getRecentPosts = function () {
            postService.getRecentPosts()
                .then(function onSuccess(recentPosts) {                    
                    $scope.recentPosts = recentPosts.slice(0, 5);                    
                }, function onError (err){
                    ngToast.danger(err);
                })
        };

        $scope.getPosts();
        $scope.getRecentPosts();
	}	
]);
