(function (){
  'use strict';
  angular.module('user')
  .factory('User', function ($q,$firebaseObject, FIREBASE) {
    var fb = new Firebase(FIREBASE);
    var response = {};

    var signUp = function (user) {
      var deferred = $q.defer();
      fb.createUser(user, function(error, userData){
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(userData);
        }
      })
      return  deferred.promise;
    }
    var resetPassword = function(email) {
      var deferred = $q.defer();
      fb.resetPassword({email: email}, function(error, userData){
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(userData);
        }
      })
      return  deferred.promise;
    }
		
		var changePassword = function(credentials) {
      var deferred = $q.defer();
      fb.changePassword(credentials, function(error, userData){
        if(error) {
          deferred.reject(error);
        } else {
          deferred.resolve(userData);
        }
      })
      return  deferred.promise;
    }

   
    return {      
      signUp: signUp,      
      resetPassword: resetPassword,
			changePassword: changePassword
    };

  })
}());
