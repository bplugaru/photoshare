(function () {
	'use strict';

	//loginController
	//signup controller
	angular.module('main', ["ngCordova"])
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
			abstrac: true,
			templateUrl: "template/menu.html"

		})
			.state('root.main.my', {
			url: 'my',
			views: {
				'tab-gallery': {
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

	function GalleryController($scope, $ionicModal, $ionicPopover, Gallery) {
		var vm = this,

			images = Gallery.getImages(),
			modal, popover;
		vm.index = -1,
		vm.deleteMode = false;
		vm.gallery = [];

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

	}
	function TakePictureController($cordovaCamera, $state, Gallery) {
		var vm = this;
		vm.imageData =  '/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gNzUK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBAAEAAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9/ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACioLu9tbCAz3lzDbxDq8zhFH4msGX4h+DYW2v4o0jP8As3aN/I0AdLRXMJ8RvBbttHijSc+90g/ma1rHX9G1MgWGrWN0T2guEf8AkaANGiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKK878cfGLw94NlkskLajqicG2gYARn0d+g+gyfavH7v4u/EbxhcPb6DbyW6Hjy9OtjI4Hu5BI+oxQB9PXV3bWUDT3dxFBEvJeVwqj8TXBa78a/BOiBlXUjqEw/wCWdknmf+PcL+teHSfC34n+JJRcajZ3crn+O+vFyPwZsj8qmHwA8ckZMNgPY3Q/woA2PEP7Ret3haLQdOg0+PoJZj50n17KPyNcjbeKPFPiiYtqXj06fGTz591JGv4JGuP0q/P8CPHsIJTTrabH/PO7T+pFYV98MPG2nAmfw3fkDvCnmj/xzNAHc6X8PfBmqMr618ULe7kPVUlVP/HpGP8AKvQdJ+CXw5miDwPNqS/3/t24f+OYr5y1mLTrawsLePS9QstVRCL03L4RjngohGRkYJyfwr0v4efBweKvCNr4gt/EVzp13K8ihY4shdrEdQwPbNAHrf8AwpX4f7dv9gD6/aps/wDodZGpfs/eELpS1g9/p0w+60U28A/Rsn9RWFcWXxe+HqG4tdQTxNpkfLRyAySBfcH5/wAia6Lwf8cvDniFktNUzo9+eNs7ZiY+z9v+BY/GgDBhuPG3weuEOrXMniHwmWCvOuTLbA98Ekge2SPcGvZdN1Kz1jToNQ0+4S4tZ0DxyIeGFSzQwXlq8MyJNBMhVlYBldSOQfUEV4JPq178C/G72JjluvCOpMZoYs5aHn5thPdcjI7jHegD6AorO0TXtM8R6ZHqOk3kd1aydGQ8g+hHUH2NaNABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFeLfFz4qXFjcnwl4WZ5NVmIiuJ4eWiJ4EaY/jOfw+vTq/iv4+j8EeGX+zyL/a94DHaJ1K+shHoP54rkPgh8O2tYR4x1yNpNQusvaLLyUU9ZDn+Ju3t9aAG+AfgNZ20Mep+L/8AS7x/nFkG/dx9/nI+8fbp9a9os7K10+2S2sraG3gThY4UCKPoBU9FABRRRQAUUUUAV7yxs9QgMF7awXMR6pNGHX8jUemaVYaNZiz020htLYMWEUK7VBJycD61cooAK838f/B3RPGRkvbXbp2rnk3Ea/JKf9te/wBRz9a9IooA+XYr74l/BqYQ3Eb3OkK2AHzNbMP9luqH24+hrd8R/Efwl8UPB0ulamG0fV4/3to8/wA0QlA6bx0B5ByB19q+g5I0mjaOVFdGGGVhkEehFeY+LPgX4X8QCSfT0Oj3rch7dcxE+8fT/vnFAHzj4T8Y6z4J1gXulXG3nE0DHMcyjsw7+x6jtX1z4J8a6Z450JNRsG2SLhbi3Y/PC/ofUeh718qeM/hr4i8ES7tQthNZE4S8gy0Z9j3U+x/DNUfBnjHUvBOvxapp7bl+7PAxwsyd1P8AQ9jQB9vUVj+GfEuneLNCt9X0yXfBKOVP3o27qw7EVsUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFcn488faX4D0c3V4RLdygi2tFbDSt/RR3NL4/wDHVh4D0Br+5xLdS5S1tgcGV/6KO5/xFeHeBfBuq/F3xLP4o8UTyNpqSYbHHnEciJP7qDv/AIkkAFnwN4T1n4s+LW8XeKdx0qN8qhBCzYPEaDsg7n+pJr6SVVRQqgBQMAAcAVHa2sFlaxWtrCkMEShI4412qoHQAVLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBDd2lvfWstrdwRz28qlJI5FDKwPYg18kfFr4ff8ACDeIlezVjpF7l7YnnyyPvRk+2Rj2Psa+va434o+Fh4t8B39kke67hX7Ra8c+YozgfUZX8aAPm74WfEGbwN4jXznZtIu2CXcXXb6SAeo/UZHpX2BDLHcQpNC6vFIoZHU5DA8givgVEeRtqKzHBOAM8AZNfUfwA8USa14Mm0m5cvPpTiNSTyYmyU/Ihh9AKAPWqKKKACiiigAooooAKKKKACiiigAqjrGr2WhaRc6pqEwhtbZC8jn09B6k9APWrFzd21nGJLq4igRmCBpHCgsegye5r5++K2uar8Q/GUXgfwzG08Fo+bgofkaUdSx7KnT659qAOF1jVNa+MfxFhigjZRK3lW0XVbeEHJZvw5J9fwr6w0HRbTw7oVnpFim23tYxGvq3qT7k5J+tc18Ovhxp3gHSysZFxqc6j7TdkYz/ALK+ij9ep9tvxX4q0vwdocuq6pLtjX5Y41+/K/ZVHc/yoA1rm5gs7eS4uZo4YIxueSRgqqPUk9K801b44aBDemw0Cyvtfvc4C2cZ2E/72Mn6gEVwOmWvin47a091qU8mneF7aTiKL7pP91f7z46seB6dq928PeFtF8K2C2ejWEVtGB8zKMu59WbqT9aAPPf+E0+K9/8APYfD+3t4z0F3cAN+OWX+VZ178VvHvhOSObxb4LijsCwV5rVzgf8AAtzLn2OM17XVXUdOtNW0640++gWa1uEMckbdGBoAqeHfEWmeKdGh1XSbgTW0v4Mjd1YdiPStWvnFNF8ZfBPxHc32mWs2reGpWzKEBIKdt4HKOP72Mfyr2fwf490HxvZ+dpV0PPQZltZfllj+o7j3GRQB09FFFABRRRQAUVieKvFWl+D9El1TVZtka8JGvLyt2VR3NeASat8QfjVqUsGmbtP0NW2sFcpCg9HYcyN7D8hQB77f+NfC+lyGO98QaZBIOqPcpuH4ZzWevxQ8Ds+weJ9Pz7yYH59K4fRf2dPDtrEravqF5fzfxCMiGP8AIZP61X8Z+APhN4N0sz6pBPFMynyYIrtzLKf9lST+Z4FAHsOm6tp2sW/n6Zf215D0L28quB+RqPW9bsfD2lS6nqU3k2kRUSSYzt3MFB+mSK+NPCHi+78HeKYdW04ukAkxLbl8iSInlD6nHQ+vNfWHi7RE+IXgCSwsL5IItQSGaK4Kbht3K44yOoFAHzn4zsm+HXxdXUbSJZLJp1v7YDlJInOWUdsfeX6V6D8P5tG0n4xv/YEyHRvEOnG4t41P+qkByUI7EFX47ZrZ8d/Cu61b4Y6ZYRTi81vRINsMoTb56AYKYyewGPce9fPHhfV5fC/jHTdTdXRrK6VpUIwdoOHUj6ZFAH3JRTIpUmhSWNg0bqGVh0IPQ0+gAooooAKKKKACiiigAooqK5uIrS1luZ3CQxIZHY9FUDJP5UAeB/HzXLjWfEGj+CdNzJKZFllRT96V/ljU/QEn/gQr1bwF4F0/wNoSWdsqyXkoDXd0R80r/wBFHYf1zXzt4H1Z/FXx6sdWugS11eyTBTztARig/AAD8K+tKAGSyxwQvNK6pGilmZjgKBySa+WdWvtR+NvxRi0+0d49KiYrFxxDAD80hH95uPzUV678dPEL6J8OpreFys+pSC1BHUIQS/6DH414v8MfiZpfw9tLwSaHLeXt0433CzhMRjooBU98nr6elAH1PpGk2WhaTbaZp0Cw2tugSNB6ep9SepNXa8PT9pTSD/rPD16v+7Mh/wAKsx/tI+Gz/rNH1VfoIz/7MKAPZ6K8gT9o3wicbtP1lf8AtjGf/alPP7RXg4D/AI89YP8A2wj/APi6APXCM9a+Z/i1pkvw5+JGneJtAH2VLvMwSPhPMUjzFwP4WBGR7mu0l/aP8LqP3Olas5/2kjX/ANnNebfFD4raf8QNKtbKDRprWS2n81J5JgTgggrtA78d+1AH09omqwa5odjqtt/qbuBJlHpuGcfUdKv15r8CL9r34W2cbHJtZ5YPw3bh+jV6VQAVm6/r1h4a0S51bU5hFbW65J7seygdyTwK0q+T/jR4/fxX4kbTLKbOkac5RNp4mk6M/uOw9ue9AF/TrfWfjv8AEB7i+aS20Wz5ZUPEEZPCL6u2OT7E9ABX0tpel2WjadBp+nW0dvawLtjjQYAH9T71418PviN8OvBXhG00tNTlNyR5l1ILOT55SOf4eg6D2FdI/wAevAifdvbt/wDdtX/rigD0yuf1XwN4Z1zUv7R1XRra8u9oXzJgW4HQYziuHl/aG8Fx/ci1SX/dt1H82FUpf2kPDK/6rSdWf/eWNf8A2Y0AX/ij8KNM1jwmZPD2l2tnqNgDJFHawrGJl/iQgDk8ZHv9aq/AHxemqeGH8O3MmL7TCfLVjy0JPH/fJJH0xVBv2lNGB+XQL8j3lQV5M/jm30/4n/8ACW+H7OWzgeYSyWrsDuDf6xeOMNyfbPtQB9kV4v8AGn4W2+q6fc+KNHhEepW6GS6iQcXCActj+8Bz7j3r2K0uor2zgu4G3wzxrJG3qrDIP5GpWUOpVgCpGCD3FAHmXwO8XL4i8DxafNJm+0rFu4J5aP8A5Zt+Q2/8Br06vkYanefCL4vX/wBlRmtYLhkeDOBLbv8AMo+uCCD6ivqnRNasPEOj22q6bOJrW4TcjDqPUEdiDwRQBoUUUUAFFFFABRRRQAVy3xHtNVv/AIfaxZ6LAZ76eHy1jDAEqSA+M99ua6mqerajFpGj3upTf6q1geZvcKCf6UAfJHwltriD4vaLbyxPHNFPIJI3BDKQjZBHavsOvnH4BaNc634y1Txbe5fydwDn+KaU5Yj6Ln/voV9HUAeCftMO4tfDSDPll7kn6gR4/ma+f5YJoQhlieMSKGQupG5T0I9RX1F+0FoMmqeA4tRhQs+m3AkfA6RsNrfrtP4VB8Er/S/FXw7Giana2t5LpkjRmK4jV/3bEspwfqw/CgD5gr0v4RfDWXxlraX+o27jQ7Vt0jMCBOw6Rg9x6+3Hevolfhl4JWcTDwzp28HPMII/LpXTwQQ2sCQW8SRRIMKkahVUegA6UAc+vw/8HoMDwzpP/gKn+FS/8IN4TH/MtaR/4Bx/4Vv0UAc+3gTwk3Xw1pP/AIBp/hWL4p8B+EofCmsTx+HdMiljsZmSRLZVKkISCDjgiu6rhvi9rkehfDTVmZwJbuM2cQzyxk4OPou4/hQBzX7Om7/hX13np/aL4/74SvXq83+BenNYfC2xd12tdSy3GPYttH6KK9IoA4n4s+JH8MfDvUbqB9l1OBawMOoZ+CR7hdx/CvB/DvwnuNa+FeoeJUinn1KQj+z7aIElkVwHOO5PzAD29+PS/wBo6GeTwNp8sYJijv18zHbKMAT+P86634RXUF18LNCaAjEcJjcDsysQf8fxoA+WLfwD4uurgQReGtUMmcfNauoH1JAAr1Hwh+zxe3RS58VXf2SLr9ktmDSH/ebov4Z/CvoyigDkNL+FvgnSY1W38O2UhH8dwnnMfxfNbK+F/D6rtXQ9MAHYWkf+Fa1FAHP3PgTwndgifw3pTZ7i0QH8wK8X+OHg3wf4V8P2c+laUlrqV3c7EMcr7dgBLHaTj+6Pxr6Ir5i+K99N4++Ltn4a05t8ds62aleQHJzI34dD/uUAe8fD1ZF+HXh0S53/ANnw5z/ujH6V0tQ2ttFZWcNrAu2KGNY0X0UDA/QVNQB86ftH+HfI1TTPEUSfJcIbWcjs68qT9QSP+A039nHxBcx63qXh93LWssBuo1PRHUhTj6hh/wB8ivXvid4b/wCEp8AanYIm65SPz7fjnzE5AH1GR+Nedfs8aFo0lhP4ggef+1og9ncRs4KBSVdWAxkZAA69jQB7pRRRQAUUUUAFFFFABXnvxt1I6b8LNTCth7po7dffcwz/AOOg16FXinxhvz4g0bQtJH/Lz4he1IHcRs0f/s1AHd/C/wAPJ4a+HulWezbPLELic45Mj/Mc/QYH4V2FIqhVCqAABgAdqWgCK6toL20mtbmJZYJkMckbDIZSMEGvmXXtA174I+NE13Rw9xo0rFVLZKshOTFJ6H0PsD6ivp+oLyzttQs5bS8gjuLeVdskUihlYehBoAwPBvjzRPG+nC40y5AnUZmtJCBLEfcdx7jiumrwbxV8CL3T746v4E1CS3mQ71tXlKMh/wCmcn9G/OsCP4vfEbwVKtl4k0wXG3gG9gMbt9HXAb680AfTFFeARftMDZ++8LEv/sXuB+qVQvv2jNdvSING8P20Mz8L5jtO2fYALzQB9B6nqljo+ny3+o3UVtaxDc8sjYA/+v7V80+JNZ1P43+PrXSNHjki0i2Y7GYcImfmmf39B9B3NWrTwD8R/iffR3nim7nsbAHI+1DbtH+xCMYPucfU17v4R8GaN4K0oWGkwbd2DNO/MkzerH+nQUAaumadb6RpVpp1ou23tYVhjH+yowP5VboooAy/Eeg2fifw/eaPfLmC6jKkjqp6hh7g4P4V88+H/EHiD4G+I5tF1y0kudEuZN6snRu3mRk8ZxjKn26V9NVn6zoemeINOew1ayhu7Z+qSLnB9QeoPuKAKvh3xbofiuzFzo2ow3K4yyA4dPZlPIrarwjXv2e5ba7N/wCDtbktJVO5IbhyCv8AuyLyPxH41k/bPjl4T/dyQ3WoQr0JjS6B/EZb86APo2ivnRfjH8Tofkn8KRs46506dT/6FTm8Y/GnxSn2fT9Fl09X4MkVoYeP9+U8fhQB6N8U/iVaeCdGktrWZJNcuEK28IOTED/y0b0A7DufxrkvgR4CntUk8Y6wjfa7tSLNZPvBG+9Ic926D2z607wX8CnTUhrfjW8GoXZbzPsocupb1kc/e+nT3Ne2qoVQqgAAYAHagBaKKKACvnzQbxfhl8eNR0aZvK0jWGBjzwq7zujP0DFk/GvoOvCf2j9A8zT9J8QxL88MhtZiOu1vmQ/gQ3/fVAHa/Dn4izeMNR1nStRs4rXUNMmKkRE7XTcVzg8ggjn6ivQa+ZP2fL24uviTqUk8jSS3FhJJI7Hlm8yM5Pvya+m6ACiiigAooooAK+cp9QTVfGXhWy3hmt/Fd/vGf+myOP519G18k+Gty/tAxRknA1yY4zxne1AH1tRRRQAUUUUAFRzwQ3MTRTxJLG33kdQwP1BqSigDn5PA3hOVy7+GtJLHqfsaf4Vp2GjaXpQI0/TrS0B6+RCqZ/IVdooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuU+JejDXvh1rdkF3SfZzNGP9tPnH/oOPxrq6RlV1KsAVIwQe4oA+X/ANnMA/EK8PcabJ/6Mjr6hr5q+CVp/Y3xl1nSz/yxt7mAf8BlT+gr6VoAKKKKACiiigAr5G0STy/2g42zj/ifSD85GH9a+ua+K5tWXTPivNqzH5LfWmnb/dExJ/SgD7UopFYMoZSCCMgjvS0AFFFFABRRWHrHjLw3oBZdV1uytnXrG0oL/wDfI5/SgDcory7UPj94IsyRBLfXxH/PC3IH5uVrmrz9paxXIsfDdxJ6Ge5VP0AP86APdqK+bpv2k9aZj5Gg6ei+jyOx/TFRJ+0j4hH39F0xvoZB/wCzUAfS1FfPFv8AtLXYx9p8NQN7x3RX+amtm1/aT0Z8fa9Av4fXypUk/ntoA9uory6z+P8A4HucedLf2uf+e1sTj/vgtXQWXxV8DX+PJ8SWSk9piYv/AEICgDsaKzbbxFol5j7LrGnzZ6eXco2fyNaQORkdKACiiigAooooAKKKKACiiigDwDw5CLD9qTVoQMCUTN/31GHr3+vBwRF+1kwHG+LH/kqD/SveKACiiigAooooAK+F/EFrMPEGtP5bbYb2RZD/AHSXbGfyNfdFfPV74OS6+K/jjw6UGNW0x7y1z/z13o6kf8DDCgD1j4Y6u2ufDfQ7123SfZxC59WjJQn/AMdrra8n/Z7uzN8OpbZshrW+lj2nqAQrfzY16xQAVyHjv4iaP4C09Zb1jPeyg+RZxn55Pc/3V9/5119ebX/wY0TXfEdzrfiC/v8AUriZ8+UXEcaL2UBecAcdaAPDtb+JXjr4gX5sbF7mOKQ4Sx01WGR/tEfM3vk49hXQ+Gf2edd1ILca/ex6ZE3JiQebMfrztH5n6V9D6N4f0jw9a/ZtI063s4u4hQAt9T1P41pUAea6T8CvA+mqvnWM+oSD+O6nbn/gK4H6V1Nr4E8JWYAg8N6UuO5tEJ/MiuhooAzV8O6Iowuj6eB6C2T/AAqOTwt4em/1mg6Y/wDvWkZ/pWtRQBzU/wAPPBtznzfDOlH/AHbZV/kKy7j4O+AbnO7w9Cmf+ecsifyau5ooA8xn+AngSbOy0vIP+ud0x/8AQs1Qk/Z08IP9y91iP6TRn+aV67RQB45/wzh4V/6Cmr/9/I//AIiu18G/D6x8EF107VdWmgdcG3up1eMe4UKMH6V11FABRRRQAUUUUAFFFFABRRRQB4BNIf8AhrND06L/AOSmK9/r5+v4/K/avtyejlGH/gNj+lfQNABRRRQAUUUUAFeYeKJE0z47eDrw/KL20ntGPrgEqPzYV6fXivx8nm0e+8IeIIVJNjeOTjufkYD8dpoA0fhzs8P/ABS8beFz8qyzLqFsv+y3Jx/32v5V6zXgvxF1mLwz8WvCfjO2fNjfWqrK69Hjzhj/AN8Op/AV7yrK6BlIKsMgjuKAFooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPDvE9t5P7T3h2XH+vt0f8lkX/ANlr3GvIPGkYH7QXgmTu1u4P4eZ/jXr9ABRRRQAUUUUAFcn8SPCQ8Z+CrzS0x9qXE1qx7Sr0H4gkfjXWUUAfGWseJjqXw+sfDuprImqaLeMkBdTkwsCGQ+hVgo+n0r6V+EWuNr3w00qeR909uhtZD3yhwP8Ax3aa8u+PXw7a3uW8X6XDmGUgX8aD7jdBJ9D0Pvg96v8A7Nmtq1rrOhSP86ut3EueoI2v+WE/OgD3qiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopGZUQszBVUZJJwAKAPHvF9ws37RXg62QgtDbMze2fM/oK9ir5v8ABernxr+0bLrUZLW0QmaL2iVDGp/HIP1NfSFABRRRQAUUUUAFFFFAEN5aW9/ZzWd1EstvOhjkjYZDKRgg18dW2o3Xwv8AijcvZlpF067eFkJx50OcFT9Vx+OK+y68DXwrp/iT40eOtB1JABd2aywSY+aN/wB2Q6+4J/HkUAe26LrFlr+jWuq6fKJbW5jDo38wfQg8Eeoq/Xzx8HfEd34L8Y33gLXW8tZJysG48JMOw9nGCPfHrX0PQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV5h8cfGH/CN+Cm0+2k23+q5gTB5WL+NvyIX/gXtXp9fIXxW12fxn8Tri3s8zRwSCwtEU/eIbBx9XJ/SgD0P9nDw60dvqviOZMCUi0gJHUD5nP57R+Br3qsbwp4fg8L+F9P0aDBW1iCsw/jc8s34kk1s0AFFFFABRRRQAUUUUAFeJeN7seD/j54e16Q7LPUoBbTueB12En6ZjP4V7bXmfxx8KP4i8CveW0Ze80tjcoAOWjxhwPwwf8AgNADfil8Kl8aCPVtJlS1123UBXJwswHIBI6Edj/kc3o/xg1zwhJHo3xD0S7jkT5Fvo05kA7kdG+qn8K9C+F/iQ+Kfh/pl/I+65jT7PcHuZE4JP1GD+NdNqGm2Wq2j2moWkN1bv8AeimQMp/A0AZnh/xn4d8UxhtH1a3uWxkxBtsi/VDgj8q3a8G8cfAdrd21fwRNJBPGd/2EyEHPrG+cg+x/PtWj8IPiZqWpajJ4S8UmRdVhB8iWddsj7fvI4P8AEBznuAc+4B7RRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAc5498Qf8Ix4H1bVgwEsUBWH/ro3yr+pFfOnwJ8OnXfiEmoTKXt9MQ3DE85kPCD65Jb/gNegftFapM+m6J4ctFaSe+uDKYkGWbbhVGO+Sx/Kux+EvgZ/BHhLyrxV/tO8fzrnac7OMKme+B+pNAHe0UUUAFFFFABRRRQAUUUUAFBAIIIyD2oooAqafpen6TE8WnWNtZxyOZHS3iWMMx6sQB14HNW6KKACqM2i6XcajFqM2m2kl7F/q7l4VMifRsZFXqKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAPSo/5/WpKTHGKAM660fTby/t7+60+1nvLfHkzyQqzx85+ViMjknpV7cadsHpRsUHpQA3caNx9aftX0o2j0oAbuOKcpyKNq+lKAB0oA//Z';
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