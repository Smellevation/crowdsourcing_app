const BasePage = require('./base.js');
const CameraPage = require('./camera.js');
const UploadService = require('../services/upload.js');
const getCurrentLocation = require('../services/get_location.js');

class ReportView extends BasePage {
	// noinspection JSMethodCanBeStatic
	factory() {
		let page = new tabris.Page();

		let map = new esmaps.Map({
			left: 0, right: 0, top: 0, height: 250,
		}).on('ready', () => {
			let position = getCurrentLocation();
			map.moveToPosition(position, 50);
			map.addMarker(new esmaps.Marker({position: position}));
		}).appendTo(page);

		new tabris.TextView({
			top: [map, 10], centerX: 0,
			font: '150px',
			highlightOnTouch: true,
			text: '📷',
		}).on('tap', () => {
			let viewUploadService = new UploadService();
			new CameraPage().factory(viewUploadService);
		}).appendTo(page);

		return page;
	}
}

module.exports = ReportView;