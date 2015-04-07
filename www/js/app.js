(function(){
  'use strict';


  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'

  angular.module('app', ['ionic', 'ngCordova', 'firebase'])
   .constant('FIREBASE', 'https://centricphotoshare.firebaseio.com/')
   .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        resolve:{
          currentUser: function (auth){
            console.log(auth);
            return auth.getAuth();
          }
        },
        template:'<ion-nav-view></ion-nav-view>'
      })
      .state('main.resetPassword', {
        url: 'resetPassword',
        controller: 'ResetPasswordController as vm',
        templateUrl: 'template/forgot.html'
      })
      .state('main.changePassword', {
        url: 'changePassword',
        controller: 'ChangePasswordController as vm',
        templateUrl: 'template/changePassword.html'
      })
      .state('main.gallery', {
        url: 'gallery',
        controller: 'GalleryController as vm',
        templateUrl: 'template/gallery.html'
      })
      .state('auth',{
          url:'auth/',
          abstract: true,
          template:'<ion-nav-view></ion-nav-view>'
      })
      .state('auth.login', {
        url: 'login',
        controller: 'LoginController as vm',
        templateUrl: 'template/login.html'
      })
      .state('auth.signup', {
        url: 'signup',
        controller: 'SignUpController as vm',
        templateUrl: 'template/signup.html'
      });

    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('auth/login');


  })
  .run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log(event, toState, toParams, fromState, fromParams, error);
          if (error === 'user_is_not_set') {
          //    $state.go('main.login');
          }
      });
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


}())
