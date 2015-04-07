(function (){
  'use strict';

  angular.module('app')
    //.controller('MainController', MainController)
    .controller('SignUpController', SignUpController)
    .controller('LoginController', LoginController)
    .controller('ResetPasswordController', ResetPasswordController)
    .controller('ChangePasswordController', ChangePasswordController)
    .controller('GalleryController', GalleryController)
    ;

  function SignUpController($ionicPopup, $state, auth) {
    var vm = this;
    this.user = {};

    this.signUp = function(){
      auth.signUp(vm.user).then(function (result){
        $state.go('main.gallery');
      }).catch(function (error){

        var alertPopup = $ionicPopup.alert({
          title: 'Error creating user',
          template: error.message,
          buttons: [{
            text: 'OK',
            type: 'button-assertive'
          }]
        });

      });

    }
  }
  function LoginController($ionicPopup, $state, auth) {
    var vm = this;
    this.user = {};
    this.logIn = function() {
      auth.logIn(vm.user).then(function(result){
        $state.go('main.gallery');
      }).catch(function(error){

        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: error.message,
          buttons: [{
            text: 'Forgot?',
            type: 'button-positive',
            onTap: function(e){
              $state.go('main.resetPassword');
            }
          },{
            text: 'OK',
            type: 'button-assertive'
          }]
        });
      })
    }
  }

  function ResetPasswordController($ionicPopup, $state, auth) {
    var vm = this;
    this.resetPassword = function() {
      auth.resetPassword(vm.email).then(function(result){
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'check your imbox',
          buttons: [{
            text: 'OK',
            type: 'button-positive',
            onTap: function(e){
              $state.go('main.login');
            }
          }]
        });
      }).catch(function(error) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: error.message,
          buttons: [{
            text: 'OK',
            type: 'button-assertive'
          }]
        });

      })
    }
  }
  function ChangePasswordController() {

  }
  function GalleryController($scope, auth, currentUser) {
    $scope.user = "gigi becali";
      //console.log(auth.getAuth());
  }
}());
