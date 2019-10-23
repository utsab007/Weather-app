const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/d7d81ad58e3954127b5ee1a8aecaa950/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect DarkSky api", undefined);
    } else if (body.error) {
      callback("unable to find the co-ordinates", undefined);
    } else {
      callback(undefined, {
        Summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      });
    }
  });
};

module.exports = forcast;
