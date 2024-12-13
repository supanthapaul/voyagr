var axios = require('axios');

module.exports = async function getAutocompleteService(searchQuery) {
	var config = {
		method: 'get',
		url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&apiKey=${process.env.GEOAPIFY_AUTOCOMPLETE_API_KEY}`,
		headers: {}
	};
	try {
		var response = await axios(config);
		var data = response.data.features;
		var result = [];
		data.forEach(element => {
			let destination = {
				city: element.properties.city,
				state: element.properties.state,
				country: element.properties.country,
				result_type: element.properties.result_type,
				formatted: element.properties.formatted,
				address_line1: element.properties.address_line1,
				address_line2: element.properties.address_line2,
				rank: element.properties.rank
			}
			result.push(destination);
		});
		return result;
	}

	catch (err) {
		throw {
			error: "Failed to generate autocomplete response",
			message: err.message
		}
	}
}
