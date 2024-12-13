const axios = require('axios');
module.exports = async function getImageService(searchQuery, pageQuery) {
  var config = {
    method: 'get',
    url: `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${pageQuery}`,
    headers: {
      Authorization: process.env.PEXELS_API_KEY
    }
  };

  try {
    var response = await axios(config);
    var data = response.data.photos;
    return data;
  }
  catch (err) {
    throw {
      error: "Failed to generate image response",
      message: err.message
    }
  }
}
