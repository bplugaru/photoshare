(function (){
  'use strict';
  angular.module('main')
  .factory('Gallery', function ($q,$firebaseObject, $firebaseArray, FIREBASE) {
    var fb = new Firebase(FIREBASE);    

    //user {email, password}
    var getImages = function () {
			var fbAuth = fb.getAuth();
      if(fbAuth) {
				var userRef = fb.child('users/' + fbAuth.uid);
				return $firebaseArray(userRef.child('images'));
			}
			return null;
    };
    var save = function (data) {
        var deferred = $q.defer();
				var images = getImages();
        if(images) {          
          images.$add({image: data}).then(function(){
            deferred.resolve('success'); 
          });  
        } else {
          deferred.reject('user_is_not_set');
        }
        return deferred.promise;
    };
		return { 
      getImages: getImages,
      save: save      
    };
  });
	
}());