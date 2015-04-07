(function (){
  'use strict';
  angular.module('app')
  .factory('auth', function ($q,$firebaseObject, FIREBASE) {
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
    //user {email, password}

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

    var getAuth = function() {
      var deferred = $q.defer();
      var user = fb.getAuth();
      if(user === null) {        
        deferred.reject('user_is_not_set');
      } else {
        deferred.resolve(user);
      }
      return  deferred.promise;
    }
    return {
      logIn: logIn,
      signUp: signUp,
      getAuth: getAuth,
      resetPassword: resetPassword
    };

  })
}());
