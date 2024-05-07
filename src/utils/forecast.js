const request = require('postman-request');

const forecast = (address, callback) => {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+address+"?unitGroup=uk&key=XMWAWVYNTE7TYY36VC4MEQJ3K";
    
    request(url, function (error, response) {

        if(error) {
            console.log('error')
            callback({
                Error: 'You are not Connected to Internet Connection',
                body: 'undefined'
            })
        }

        if (JSON.stringify(response) === undefined) {
            callback({
                Error: 'Unable to connect Weather Service, Please Check Internet connection',
                body: 'undefined'
            })

        } else if (JSON.stringify(response.statusCode) === '400') {
            console.log("400 stats detected")
            callback({
                Error: 'Please Provide a Valid Address',
                body: 'undefined'
            })

        } else {
            const tBody = JSON.parse(response.body);
            callback({
                Error: 'undefined',
                body: tBody
            })
            
        }
        
      });

}


module.exports = forecast
