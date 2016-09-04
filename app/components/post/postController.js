'use strict';

app.controller("PostController", [
	'$scope',
	'postService',
    'commentService',
	'$location',
    '$routeParams',
	'ngToast',
    '$route',	
	function($scope, postService, commentService, $location, $routeParams, ngToast, $route){
        
        $scope.getPostById = function ($routeParams) {
            postService.getPostById($routeParams.id)
                .then(function (post){
                    $scope.post = post;
                    commentService.getCommentsByPostId($routeParams.id)
                        .then(function (comments) {
                            $scope.comments = comments;
                        }, function (err){
                            ngToast.danger(err);
                        })
                }, function (err){
                    ngToast.danger(err);
                })
        };

        $scope.getComments = function (comment) {
            commentService.getPostById($)
        }

        $scope.addComment = function (commentData) {
            commentService.addCommentByPostId($routeParams.id, commentData)
                .then(function onSucceess(response){
                    console.log(response);
                    ngToast.success("You are succeessfully added comment.");
                    $route.reload();
                }, function onError(err){
                    ngToast.danger(err);
                    console.log(err);
                })
        }

        $scope.viewPost = function (postId) {
            $location.path('/post/' + postId);
        };

        $scope.getPostById($routeParams);
		
	}	
]);