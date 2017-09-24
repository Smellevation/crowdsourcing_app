const BasePage = require('./base.js');
const {ACCENT_COLOR,MARGIN} = require('../data/constants.json');

class WelcomePage extends BasePage {
	//noinspection JSMethodCanBeStatic
	factory() {
		let page = new tabris.Page();

		let scrollView = new tabris.ScrollView({
			top: 0, right: 0, bottom: 0, left: 0
		}).appendTo(page);

		new tabris.ImageView({
			top: 0, right: MARGIN, left: MARGIN, height: 801 / tabris.device.scaleFactor,
			image: 'src/images/welcome.jpg',
			scaleMode: 'fit',
		}).appendTo(scrollView);

		new tabris.TextView({
			left: MARGIN * 2, top: ['prev()', MARGIN], right: MARGIN * 2,
			text: 'Getting somewhere quickly is important, but there\s more ' +
				'to your transportation story.',
		}).appendTo(scrollView);

		new tabris.TextView({
			left: MARGIN * 2, top: ['prev()', 0], right: MARGIN * 2,
			font: 'bold',
			textColor: ACCENT_COLOR,
			text: 'It\'s an experience you can enjoy!',
		}).appendTo(scrollView);

		new tabris.TextView({
			left: MARGIN * 2, top: ['prev()', MARGIN * 2], right: MARGIN * 2,
			text: 'Rank your preferences, how important they are to you and ' +
				'tell us about your overall journey.  We\'ll give you ' +
				'personalized options for your maximum enjoyment.  After ' +
				'all, it\'s about the journey!',
		}).appendTo(scrollView);

		new tabris.Button({
			left: MARGIN, bottom: MARGIN, right: MARGIN,
			text: 'Let\'s Get Moving!',
		}).on('tap', () => {
			page.dispose();
		}).appendTo(scrollView);

		return page;
	}
}

module.exports = WelcomePage;