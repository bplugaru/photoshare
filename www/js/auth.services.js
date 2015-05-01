(function (){
  'use strict';
  angular.module('auth') 
  .factory('Auth', function ($q,$firebaseObject, FIREBASE) {
    var fb = new Firebase(FIREBASE);
    var response = {};

    //user {email, password}
    var logIn = function (user) {
      var deferred = $q.defer();
      fb.authWithPassword( user, function(error, authData) {
        if (error) {
          deferred.reject(error);
        } else {
					
          deferred.resolve(authData);
        }
      });
      return  deferred.promise;
    }


    var getAuth = function() {
			return fb.getAuth();
      /*var deferred = $q.defer();
      var user = fb.getAuth();
      if(user === null) {        
				
        deferred.reject('user_is_not_set');
      } else {
        deferred.resolve(user);
      }
			
      return  deferred.promise;*/
    }
    return {
      logIn: logIn,      
      getAuth: getAuth      
    };

  })
}());
