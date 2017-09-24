const {BASE_URL} = require('../data/constants.json');

class UploadService {
	/**
	 * Uploads a photo
	 * @return {Promise<Object>,<string>}
	 */
	handle(data) {
		return new Promise((resolve, reject) => {
			fetch(BASE_URL + 'upload', {
				method: 'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
				body: data
			}).then(response => {
				if(!response.ok) {
					reject(`Unable to upload photo: ${response.status} ${response.statusText}`);
				}
				return response.json();
			}).then(data => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	// noinspection JSMethodCanBeStatic
	generateStructure(photoData, lat, lon, notes) {
		let ret = {
			photo: photoData,
			lat: lat,
			lon: lon,
		};
		if(notes) {
			ret.notes = notes;
		}
		return JSON.stringify(ret);
	}
}

module.exports = UploadService;