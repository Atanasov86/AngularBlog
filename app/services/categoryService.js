'use strict';

app.factory('categoryService', [
    '$http',
    'BASE_URL',
    'KINVEY_PARAMS',
    '$q',
    function($http, BASE_URL, KINVEY_PARAMS, $q) {

        let categoryRuquestUrl = BASE_URL + 'appdata/' + KINVEY_PARAMS.appKey + '/categories';

        function getCategories() {
            let deferred = $q.defer();

            $http.get(categoryRuquestUrl)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        return {
            getCategories: getCategories
        };
    }
]);
