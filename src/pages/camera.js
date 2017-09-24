const alert = require('../components/alert.js');
const getCurrentLocation = require('../services/get_location.js');
const {IMAGE_SIZE} = require('../data/constants.json');

class CameraPage {
	factory(service) {
		// noinspection JSUnresolvedVariable
		navigator.camera.getPicture(/*success*/(imageData) => {
			let navigationView = new tabris.NavigationView({
				left: 0, top: 0, right: 0, bottom: 0,
				drawerActionVisible: false,
			}).appendTo(tabris.ui.contentView);

			let page = new tabris.Page({
				title: 'Uploading...',
			}).appendTo(navigationView);

			new tabris.ActivityIndicator({
				centerX: 0,
				centerY: 0,
			}).appendTo(page);

			let location = getCurrentLocation();
			let postData = service.generateStructure(imageData, location[0], location[1]);

			service.handle(postData).then(() => {
				alert('Uploaded image', 'Image has been uploaded');
			}).catch((message) => {
				alert('Cannot upload image', message);
			}).then(() => {
				navigationView.dispose();
			});
		}, /*error*/(message) => {
			if(message === 'Camera cancelled.') {
				return;
			}
			alert('Camera failed', message);
		}, {
			destinationType: window.Camera.DestinationType.DATA_URL,
			quality: 70,
			allowEdit: false,
			sourceType: Camera.PictureSourceType.CAMERA,
			targetHeight: IMAGE_SIZE,
			targetWidth: IMAGE_SIZE,
			correctOrientation: true,
			saveToPhotoAlbum: false,
		});
	}
}

module.exports = CameraPage;