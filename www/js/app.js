// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
app = angular.module("spectrometer", ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('banana', function($scope, $cordovaCamera, $cordovaFile) {
    $scope.images = [];
	var check_photo = 0; 
 
    $scope.addImage = function() {
        alert("add image");
		check_photo = 1;

			var options = {
			targetWidth: 250,
	  		targetHeight: 250,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			};
	
		// 3
		$cordovaCamera.getPicture(options).then(function(imageData) {
 
		// 4
		onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		return newName;
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 
	}, function(err) {
		console.log(err);
	});

		}
	
	$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;}
  	


	$scope.upload_file = function(){

	

	if (check_photo == 0){
		alert('Please, take the photo');}

	else{
	alert('Photo elaboration...');
	var canvas = document.getElementById("canvas"),
		      context = canvas.getContext("2d"),
          photo = document.getElementById("photo");

          context.drawImage(photo, 0, 0, 300, 300);

          var Pic = document.getElementById("canvas").toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");

	alert('Upload start');

            $.ajax({
                url: '/upload_img',
                type: 'POST',
                data: '{ "imageData" : "' + Pic + '" , "id_db" : ' + $('#id_db').val() + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                    alert("Done, Picture Uploaded. See the result :)");
                },
                error: function (jqXHR, status, err) {
                    alert(err.message);
                    alert("Oh no, something went wrong :(");
                }
            });	

		check_photo = 0;

		}
 		}

});



/*app.controller('banana', function($scope, $cordovaCamera, $cordovaFile) {
    $scope.images = [];
	var check_photo = 0; 
 
    $scope.addImage = function() {
        alert("add image");
		var check_photo = true:

			var options = {
			targetWidth: 250,
	  		targetHeight: 250,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			};
	
		// 3
		$cordovaCamera.getPicture(options).then(function(imageData) {
 
		// 4
		onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		return newName;
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 
	}, function(err) {
		console.log(err);
	});

		}
	
	$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;}
  	


	$scope.upload_file = function(){

	alert('start drawing on canvas');



	var canvas = document.getElementById("canvas"),
		      context = canvas.getContext("2d"),
          photo = document.getElementById("photo");

          context.drawImage(photo, 0, 0, 300, 300);

          var Pic = document.getElementById("canvas").toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");

	alert('Start ajax');

            $.ajax({
                url: '/upload_img',
                type: 'POST',
                data: '{ "imageData" : "' + Pic + '" , "id_db" : ' + $('#id_db').val() + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                    alert("Done, Picture Uploaded. See the result.");
                },
                error: function (jqXHR, status, err) {
                    alert(err.message);
                    alert("Oh no, something went wrong :(");
                }
            });	

 		}

});
*/



/*app.controller('banana', function($scope, $cordovaCamera, $cordovaFile) {
    $scope.images = [];
	i = 0;
 
    $scope.addImage = function() {
        alert("add image");

			var options = {
			targetWidth: 250,
	  		targetHeight: 250,
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			};
	
		// 3
		$cordovaCamera.getPicture(options).then(function(imageData) {
 
		// 4
		onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		return newName;
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 
	}, function(err) {
		console.log(err);
	});

		}
	
	$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;}
  	


	$scope.upload_file = function(){

	alert('start uploading');

	var Pic = document.getElementById("photo");
	
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");
			alert('buru');

            $.ajax({
                url: '/upload_img',
                type: 'POST',
                data: '{ "imageData" : "' + Pic + '" , "id_db" : ' + $('#id_db').val() + '}',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                    //alert("Done, Picture Uploaded.");
                    alert('Uploaded successfully');
                },
                error: function (jqXHR, status, err) {
                    alert(err.message)
                    alert("Local error callback.");
                }
            });}	
 		

});*/
