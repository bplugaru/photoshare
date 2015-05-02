(function(){
  'use strict';


  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'

  angular.module('app', [
		'ionic',
		'ngCordova',
		'firebase',
		'ui.router',
		'main',
		'auth',
		'user'
	])
   .constant('FIREBASE', 'https://centricphotoshare.firebaseio.com/')
   .config(function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    function resolveUser($q, Auth){
      var deferred = $q.defer();
      var user = Auth.getAuth();
      if(user) {
        deferred.resolve(user);
      } else {
        deferred.reject('user_is_not_set');
      }

      return  deferred.promise;
    }

    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        resolve:{
          resolveUser: resolveUser
        },
        template:'<ion-nav-view></ion-nav-view>'
      });

    // if none of the above states are matched, use this as the fallback

		$urlRouterProvider.otherwise('/');

  })
  .run(function($ionicPlatform, $rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			console.log('$stateChangeError - fired when an error occurs during transition.');
			console.log(arguments);
			if (error === 'user_is_not_set') {
					$state.go('auth.login');
			}
    });

		///	debugger;

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
		});

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
		});

		$rootScope.$on('$viewContentLoaded', function (event) {
				console.log('$viewContentLoaded - fired after dom rendered', event);
		});

		$rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
				console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
				console.log(unfoundState, fromState, fromParams);
		});
		$ionicPlatform.ready(function() {


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }

    });
  })
  ;
}());
