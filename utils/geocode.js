 const request = require('postman-request');
 geocode = (address, callback) => {
    const BASE_URL = "http://api.positionstack.com/v1/forward";
    const GeoCodingAccessKey = "bbaefefe15cf31de650f0c515896739e";
    const URL = `${BASE_URL}?access_key=${GeoCodingAccessKey}&query=${address}`;
    request(URL, (error, response, body) => {
      if (error) {
        callback("Unable to connect to geocode API");
      } else if (response) {
        const parsedBody = JSON.parse(body);
        // console.log(parsedBody)
  
        if (!parsedBody.data) callback("Wrong Address Entered");
        else {
          latitude = parsedBody.data[0].latitude;
          longitude = parsedBody.data[0].longitude;
          callback(null, { latitude, longitude });
        }
      }
    });
  };

  module.exports = {geocode : geocode}