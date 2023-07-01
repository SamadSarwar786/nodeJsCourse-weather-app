const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "28e64a384dd0252e3e3006bab56644cb";

  const url = BASE_URL + `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  request(url, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather API");
    } else if (response) {
      const parsedBody = JSON.parse(body);
      const data = parsedBody.main;
      const convertedIntoCelcius = {
        temp: +(data.temp - 273).toFixed(2),
        feels_like: +(data.feels_like - 273).toFixed(2),
        temp_min: +(data.temp_min - 273).toFixed(2),
        temp_max: +(data.temp_max - 273).toFixed(2),
        pressure: 1010,
        humidity: 73,
      };
      const p =
        "Temperature is " +
        convertedIntoCelcius.temp +
        " with humidity " +
        convertedIntoCelcius.humidity +
        "%" +
        " and " +
        convertedIntoCelcius.pressure +
        " pressure";
      callback(null, p);
    }
  });
};

module.exports = forecast;
