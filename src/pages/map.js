const BasePage = require('./base.js');
const ReportViewPage = require('./report_view.js');
const ReportSmellPage = require('./report_smell.js');
const {DEFAULT_LAT_LON, MARGIN, BASE_URL} = require('../data/constants.json');

class MapPage extends BasePage {
	//noinspection JSMethodCanBeStatic
	factory() {
		let page = new tabris.Page();

		let map = new esmaps.Map({
			left: 0, right: 0, top: 0, bottom: 0,
			showMyLocation: true,
			showMyLocationButton: true,
		}).on('ready', () => {
			let nv = this.navigationView;
			map.moveToPosition(DEFAULT_LAT_LON, 4000);
			map.on('tap', function({position}) {
				if(from.focused) {
					from.focused = false;
					return;
				}
				if(to.focused) {
					to.focused = false;
					return;
				}
				new tabris.ActionSheet({
					title: 'Send a report',
					actions: [
						{title: 'Smell', image: {src: 'src/images/nose.jpg', scale: 3}},
						{title: 'Sound', image: {src: 'src/images/ear.jpg', scale: 3}},
						{title: 'View', image: {src: 'src/images/view.png', scale: 2}},
						{title: 'Cancel', image: {src: 'src/images/close.png', scale: 3}, style: 'cancel'},
					]
				}).on('select', ({target: actionSheet, index}) => {
					let selected = actionSheet.actions[index].title;
					if(selected === 'View') {
						let reportViewPage = new ReportViewPage(nv).factory(position);
						reportViewPage.appendTo(nv);
					} else if(selected === 'Sound') {
					} else if(selected === 'Smell') {
						let reportSmellPage = new ReportSmellPage(nv).factory(position);
						reportSmellPage.appendTo(nv);
					}
				}).open();
			});
		}).appendTo(page);

		new tabris.Composite({
			left: MARGIN, top: MARGIN * 2, right: MARGIN, height: 30,
			background: '#FFFC',
		}).appendTo(page);

		let from = new tabris.TextInput({
			left: MARGIN, top: MARGIN, right: MARGIN,
			autoCorrect: true,
			enterKeyType: 'next',
			message: 'Seattle City Hall',
		}).appendTo(page);

		new tabris.Composite({
			left: MARGIN, top: [from, MARGIN], right: MARGIN, height: 30,
			background: '#FFFC',
		}).appendTo(page);

		let to = new tabris.TextInput({
			left: MARGIN, top: from, right: MARGIN,
			autoCorrect: true,
			enterKeyType: 'done',
			message: 'Enter destination...'
		}).on('accept', () => {
			new tabris.Page().append(
				new tabris.ActivityIndicator({
					top: 0, right: 0, bottom: 0, left: 0,
				})
			).append(
				new tabris.WebView({
					left: 0, top: 0, right: 0, bottom: 0,
					url: BASE_URL,
				})
			).appendTo(this.navigationView);
		}).appendTo(page);

		return page;
	}
}

module.exports = MapPage;