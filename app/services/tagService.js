'use strict';

app.factory('tagService', [
    '$http',
    'BASE_URL',
    'KINVEY_PARAMS',
    '$q',
    function($http, BASE_URL, KINVEY_PARAMS, $q) {

        let tagRequestUrl = BASE_URL + 'appdata/' + KINVEY_PARAMS.appKey + '/tags';

        function getTags() {
            let deferred = $q.defer();

            $http.get(tagRequestUrl)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        }
        //
        // function addTag(tag) {
        // 	let deferred = $q.defer();
        //
        // 	let dataStore = $kinvey.DataStore.collection('tags');
        //
        // 	dataStore.save(tag)
        // 		.then(function(response){
        // 			deferred.resolve(response);
        // 		}, function(err){
        // 			deferred.reject(err);
        // 		});
        //
        // 	return deferred.promise;
        // }

        return {
            getTags: getTags,
            // addTag: addTag
        };
    }
]);
