const request = require('postman-request');

const forecast = (address, callback) => {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+address+"?unitGroup=uk&key=XMWAWVYNTE7TYY36VC4MEQJ3K";
    
    request(url, function (error, response) {
        const tBody = JSON.parse(response.body);
        if(error !== null) {
            callback('Unable to connect Weather Service')
        } else {
            callback(tBody)
        }
        
      });

}


module.exports = forecast
