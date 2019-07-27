const request = require('request');

const weatherReporter = function(location, callback) {
  // console.log(location);

  const geolocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2ttMTQ3NDciLCJhIjoiY2p5NGs1bnEyMDk1cDNtbGFmZGR2ZTMxcCJ9.GA3za0y-fWjzaWJ-VJmiBw`
  request({ url: geolocationURL, json: true }, (err, response) => {
    // console.log(err,response);

    if (err) {
      callback('There is an error to find location', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find the location try another location', undefined);
    } else {
      const latitude = response.body.features[0].center[0];
      const lognitude = response.body.features[0].center[1];
      console.log(latitude, lognitude);

      // console.log(forcast(latitude, lognitude, callback));
      forcast(latitude, lognitude, callback);

      // console.log(sum(5, 6));

      // callback(undefined, forcast(latitude, lognitude));
    }
  });
};

const forcast = (latitude, lognitude, callback) => {
  const url = `https://api.darksky.net/forecast/4897b690049ca7cbf00ce91115cfc2b3/${lognitude},${latitude}`;

  request({ url: url, json: true }, (err, response) => {
    callback(
      undefined,
      `Its ${
        response.body.currently.apparentTemperature
      } degree out there, there is ${
        response.body.currently.precipProbability
      }% chance of raining`
    );
  });
};

module.exports = { weatherReporter: weatherReporter };
