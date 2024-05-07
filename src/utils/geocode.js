const request = require('postman-request')

const geocode = (lati, long, callback) => {
    const url = "https://api.geoapify.com/v1/geocode/reverse?lat="+lati+"&lon="+long+"&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783";


    request(url, function(error, response) {
        const tBody =JSON.parse(response.body)
        if(error) {
            callback('Unable to Connect weather Services')
        } else {
            callback(tBody.results[0].city)
        }
    })
}

module.exports =geocode
