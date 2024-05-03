const path = require("path");
const express = require("express");
const hbs = require('hbs');

const app = express();

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicDirectoryPath))


app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
    title: 'Waether App is Here',
    name: 'Sheetal'
  })
});


app.get('/weather', (req, res) => {
  console.log(req.query)
  if(req.query.lat.length !== 0 && req.query.long.length !== 0)  {
    
    console.log('if condi')
    geocode(req.query.lat, req.query.long, (geoData) => {
      console.log(geoData)
      forecast(geoData, (forecastData) => {
        res.send({
          weatherData:forecastData,
          icon:forecastData.currentConditions.icon,
          temp:forecastData.currentConditions.temp,
          humidity:forecastData.currentConditions.humidity,
          windspeed:forecastData.currentConditions.windspeed,
          cloudcover:forecastData.currentConditions.cloudcover,
        })
      })

    })


  } else {
    console.log('else co')
    forecast(req.query.address, (forecastData) => {
      res.send({
        weatherData:forecastData,
        icon:forecastData.currentConditions.icon,
        temp:forecastData.currentConditions.temp,
        humidity:forecastData.currentConditions.humidity,
        windspeed:forecastData.currentConditions.windspeed,
        cloudcover:forecastData.currentConditions.cloudcover,
      })
    })

  }

  

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Page',
    name: 'Sheetal',
    errorMessage: 'Artical is not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'This is 404',
  })
})

app.listen(3000, () => {
  console.log("Server is on port")
});

