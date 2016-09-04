'use strict';

app.controller("HomeController", [
	'$scope',
	'postService',
	'$location',
	'ngToast',	
	function($scope, postService, $location, ngToast){

		$scope.getPosts = function () {
            postService.getAllPosts()
                .then(function (response) {
                    $scope.posts = response;
                }, function (err) {
                    ngToast.danger(err.description);
                });
        };

        $scope.getPosts();
	}	
]);
