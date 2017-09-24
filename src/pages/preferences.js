const BasePage = require('./base.js');
/** @type {Array} */
const factors = require('../data/factors.json');
const {ACCENT_COLOR,MARGIN,RADIO_SELECTED_COLOR} = require('../data/constants.json');

class PreferencesPage extends BasePage {
	//noinspection JSMethodCanBeStatic
	factory() {
		let page = new tabris.Page();

		let scrollView = new tabris.ScrollView({
			top: 0, right: 0, bottom: 0, left: 0
		}).appendTo(page);

		new tabris.ImageView({
			top: 0, right: 0, left: 0, height: 529 / tabris.device.scaleFactor,
			image: 'src/images/seattle.jpg',
			scaleMode: 'fill',
		}).appendTo(scrollView);

		new tabris.TextView({
			top: ['prev()', MARGIN], centerX: 0,
			textColor: ACCENT_COLOR,
			text: 'What are you in the mood for?',
		}).appendTo(scrollView);

		new tabris.TextView({
			top: ['prev()', MARGIN], centerX: 0,
			text: 'Let\'s set up your personalized adventure!',
		}).appendTo(scrollView);

		factors.forEach((data) => {
			let container = new tabris.Composite({
				left: MARGIN, top: ['prev()', MARGIN], right: MARGIN,
			}).appendTo(scrollView);

			let nose = new tabris.ImageView({
				top: 0, left: MARGIN, height: 72, width: 72,
				image: 'src/images/' + data.image,
				scaleMode: 'fit',
			}).appendTo(container);

			data.options.forEach((title, index) => {
				new tabris.RadioButton({
					left: [nose, MARGIN], top: index === 0 ? 0 : ['prev()', 0],
					text: title,
					checkedTintColor: RADIO_SELECTED_COLOR,
				}).on('checkedChanged', ({target, value: checked}) => {
					if(checked) {
						//target.text
					}
				}).appendTo(container);
			});

			let slider = new tabris.Slider({
				left: MARGIN, top: ['prev()', MARGIN], right: MARGIN,
				minimum: -50,
				selection: 0,
				maximum: 50
			}).on('selectionChanged', ({value}) => {
				//
			}).appendTo(container);

			new tabris.TextView({
				left: 0, top: [slider, 0],
				text: 'Meh...\ndon\'t care',
			}).appendTo(container);

			new tabris.TextView({
				right: 0, top: [slider, 0],
				text: 'Very\nImportant!',
			}).appendTo(container);

			new tabris.Composite({
				top: ['prev()', MARGIN], height: MARGIN,
			}).appendTo(container);
		});

		new tabris.Button({
			top: ['prev()', MARGIN], left: MARGIN * 2, right: MARGIN * 2,
			text: 'Let\'s Go!',
		}).on('tap', () => {
			page.dispose();
		}).appendTo(scrollView);

		new tabris.Composite({
			top: ['prev()', MARGIN], height: MARGIN,
		}).appendTo(scrollView);

		return page;
	}
}

module.exports = PreferencesPage;

/*
			let reportviewPage = new ReportViewPage(this.navigationView).factory();
			reportviewPage.appendTo(this.navigationView);
 */