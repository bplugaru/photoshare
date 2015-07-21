(function () {
	'use strict';

	//loginController
	//signup controller
	angular.module('main', ['ngCordova'])
		.config(onConfig)
		.controller('GalleryController', GalleryController)
		.controller('TakePictureController', TakePictureController)
		.controller('ChangePasswordController', ChangePasswordController)
	;
	function onConfig($stateProvider) {
		$stateProvider.state('root.main', {
			url: '/',
			resolve: {
				resolveUser: function (resolveUser) {
					return resolveUser;
				}
			},
			//abstract: true,
			templateUrl: "template/menu.html"
		}).state('root.main.my', {
			url: 'my',
			views: {
				'tab-gallery': {
          images: function(Gallery) {
            return Gallery.images();
          },
          controller: 'GalleryController as vm',
					templateUrl: 'template/gallery.html'
				}
			}

		})
			.state('root.main.takePicture', {
			url: 'take',
			views: {
				'tab-take-picture': {
					controller: 'TakePictureController as vm',
					templateUrl: 'template/take.html'
				}
			}
		})
			.state('root.main.changePassword', {
			url: 'changePassword',
			views: {
				'tab-change-password': {
					controller: 'ChangePasswordController as vm',
					templateUrl: 'template/changePassword.html'
				}
			}

		})


		// if none of the above states are matched, use this as the fallback

	}

	function GalleryController($scope, $ionicModal, $ionicPopover, $cordovaSocialSharing, Gallery) {
		var vm = this,
			images = Gallery.getImages(),
      modal, popover;

    vm.index = -1,
		vm.deleteMode = false;
		vm.gallery = [];
    vm.showPreload = true;
    images.$loaded().then(function(){
      vm.showPreload = false;
    })
		images.$watch(function(event){
			console.log(event)
			if(event.event === 'child_added') {
				vm.gallery.push({src:"data:image/jpeg;base64," + images.$getRecord(event.key).image, key: event.key});
			}
		});

		$ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });

		vm.openModal = function() {
      vm.modal.show();
    };

    vm.closeModal = function() {
      vm.modal.hide();
    };


		vm.showImage = function(index) {
			vm.index = index;
			vm.imageSrc = vm.gallery[vm.index].src;
			vm.openModal();
		}

		vm.onDelete = function() {
			images.$remove(vm.index).then(function(){
				vm.deleteMode = false;
				vm.gallery.splice(vm.index,1);
				vm.closeModal();
			});
		}

    vm.shareOnFacebook = function(image) {
      $cordovaSocialSharing
        //.shareViaFacebook('Hello from my office', image)
        .shareViaTwitter('Hello from my office')
        .then(function(result) {
          // Success!
          console.log("ok");
        }, function(err) {
          console.log("not ok");
          // An error occurred. Show a message to the user
        });

    }

	}
	function TakePictureController($cordovaCamera, $state, Gallery) {
		var vm = this;
		vm.imageData =  '';
		//$ionicHistory.clearHistory();
		vm.onSave = function() {
			Gallery.save(vm.imageData).then(function(){
				$state.go("root.main.my");
			}, function(err){
				console.log(err);
			});
		}
		vm.onCancel = function() {
			vm.userImg = "";
			vm.takePicture();
		}
		vm.takePicture = function() {
			var options = {
				quality: 75,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				//popoverOptions: CameraPopoverOptions,
				targetWidth: 500,
				targetHeight: 500,
				saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function (imageData) {
				vm.imageData = imageData;
				vm.userImg = "data:image/jpeg;base64," + imageData;
			}, function (err) {
				console.log(err);
			});
		}
		if (ionic.Platform.platforms[0] === "browser") {
			vm.userImg = "data:image/jpeg;base64," + vm.imageData;
		} else {
			vm.takePicture();
		}
	}
	function ChangePasswordController($ionicPopup, $state, User) {

		var vm = this,
			alertPopup;
		vm.changePassword = function () {
			User.changePassword({ email: vm.email, oldPassword: vm.oldPassword, newPassword: vm.newPassword }).then(function (result) {
				alertPopup = $ionicPopup.alert({
					title: 'Info',
					template: 'Your password successfully changed',
					buttons: [{
						text: 'OK',
						type: 'button-positive'
					}]
				});
			}).catch(function (error) {
				alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: error.message,
					buttons: [{
						text: 'OK',
						type: 'button-assertive'
					}]
				});

			});
		};
	}
} ());