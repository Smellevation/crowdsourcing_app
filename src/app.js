const MapPage = require('./pages/map.js');
const PreferencesPage = require('./pages/preferences.js');
const WelcomePage = require('./pages/welcome.js');

let navigationView = new tabris.NavigationView({
	left: 0, top: 0, right: 0, bottom: 0,
	toolbarVisible: false,
}).appendTo(tabris.ui.contentView);

new MapPage(navigationView).factory().appendTo(navigationView);
new PreferencesPage(navigationView).factory().appendTo(navigationView);
new WelcomePage(navigationView).factory().appendTo(navigationView);