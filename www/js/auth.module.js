(function() {
'use strict';
	//loginController
	//signup controller
	angular.module('auth',[])
		.config(onConfig)
		.controller('LoginController', LoginController)
  ;
	function onConfig($stateProvider) {

		$stateProvider.state('auth',{
				url:'/auth',
				abstract: true,
				template:'<ion-nav-view>x</ion-nav-view>'
		})
		.state('auth.login', {
			url: '/login',
			controller: 'LoginController as vm',
			templateUrl: 'template/login.html'
		});
		// if none of the above states are matched, use this as the fallback

	}


	function LoginController($ionicPopup, $state, Auth) {
		var vm = this;
		vm.$state = $state;
		vm.user = {};
		vm.logIn = function() {
			Auth.logIn(vm.user).then(function(result){
				$state.go('root.main.my');
			}).catch(function(error){

				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: error.message,
					buttons: [{
						text: 'Forgot?',
						type: 'button-positive',
						onTap: function(e){
							$state.go('user.resetPassword');
						}
					},{
						text: 'OK',
						type: 'button-assertive'
					}]
				});
			})
		}
	}
}());