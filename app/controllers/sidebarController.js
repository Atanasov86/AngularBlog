'user strict';

app.controller('SidebarController', [
    '$scope',
    '$rootScope',
    '$location',
    '$route',
    'categoryService',
    'postService',
    'tagService',
    'ngToast',
    function($scope, $rootScope, $location, $route, categoryService, postService, tagService, ngToast) {

        $scope.getRecentPosts = function() {
            postService.getRecentPosts()
                .then(function(reponse) {
                    $scope.recentPosts = reponse.slice(0, 5);
                }, function(err) {
                    ngToast.danger(err.description);
                });

        };

        $scope.getCategories = function() {
            categoryService.getCategories()
                .then(function(response) {
                    $scope.categories = response;
                }, function(err) {
                    ngToast.danger(err.description);
                });
        };

        $scope.getTags = function() {
            tagService.getTags()
                .then(function(response) {
                    $scope.tags = response;
                }, function(err) {
                    ngToast.danger(err);
                });
        };
        //
        // $scope.updatePath = function(selectedCategory) {
        // 	$location.path('post/category/' + selectedCategory.name);
        // };
        //
        $scope.getRecentPosts();
        $scope.getCategories();
        $scope.getTags();
    }
]);
