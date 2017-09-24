class BasePage {
	/**
	 * @param {NavigationView|tabris.NavigationView} navigationView
	 */
	constructor(navigationView) {
		/** @type {tabris.NavigationView} */
		this.navigationView = navigationView;
	}
}

module.exports = BasePage;