(function (){
  'use strict';
	angular.module('user',[])
			.config(onConfig)
			.controller('ResetPasswordController', ResetPasswordController)

			.controller('SignUpController', SignUpController)
	;

 
	function onConfig($stateProvider) {
		 $stateProvider.state('user',{
					url:'/user',
					abstract: true,
					template:'<ion-nav-view></ion-nav-view>'
			})
			.state('user.resetPassword', {
				url: '/resetPassword',
				controller: 'ResetPasswordController as vm',
				templateUrl: 'template/resetPassword.html'
			})
		 
			.state('user.signup', {
				url: '/signup',
				controller: 'SignUpController as vm',
				templateUrl: 'template/signup.html'
			});


		// if none of the above states are matched, use this as the fallback
		
	}
	
	function SignUpController($ionicPopup, $state, User) {
    var vm = this;
    this.user = {};

    this.signUp = function(){
      User.signUp(vm.user).then(function (result){
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
	
  function ResetPasswordController($ionicPopup, $state, User) {
    var vm = this;
    vm.resetPassword = function() {
      User.resetPassword(vm.email).then(function(result){
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'check your imbox',
          buttons: [{
            text: 'OK',
            type: 'button-positive',
            onTap: function(e){
              $state.go('auth.login');
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
  
 
}());
