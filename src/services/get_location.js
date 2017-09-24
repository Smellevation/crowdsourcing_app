const {DEFAULT_LAT_LON} = require('../data/constants.json');

/**
 * Returns the device's current location
 * @return {[number,number]}
 */
module.exports = function() {
	return DEFAULT_LAT_LON; //Hackaton = Hardcoded
};