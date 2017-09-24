const BasePage = require('./base.js');
const {MARGIN} = require('../data/constants.json');
const THUMB_SIZE = 100;
const getCurrentLocation = require('../services/get_location.js');

class ReportSmell extends BasePage {
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
			top: [map, MARGIN], centerX: THUMB_SIZE * -1,
			font: THUMB_SIZE + 'px',
			highlightOnTouch: true,
			text: '👍',
		}).on('tap', () => {
			page.dispose();
		}).appendTo(page);

		new tabris.TextView({
			top: [map, MARGIN], centerX: THUMB_SIZE,
			font: THUMB_SIZE + 'px',
			highlightOnTouch: true,
			text: '👎',
		}).on('tap', () => {
			page.dispose();
		}).appendTo(page);

		return page;
	}
}

module.exports = ReportSmell;