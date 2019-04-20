const request = require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/8dcccb891f558952ace7a636e739270f/${lat},${lon}`;


    request({
        url:url,
        json:true
    }, (error, { body }) => {
        if(error){
            callback('Unable to connect', undefined)
        } else if ( body.error ){
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain`)
        }
    })

}

module.exports = forecast
