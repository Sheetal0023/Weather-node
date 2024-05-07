const path = require("path");
const express = require("express");
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode');


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

  if(req.query.lat.length !== 0 && req.query.long.length !== 0)  {
    
    geocode(req.query.lat, req.query.long, (geoData) => {
      forecast(geoData, (forecastData) => {
        
        res.send({
          error: forecastData.error,
          weatherData:forecastData.body,
          icon:forecastData.body.currentConditions.icon,
          temp:forecastData.body.currentConditions.temp,
          humidity:forecastData.body.currentConditions.humidity,
          windspeed:forecastData.body.currentConditions.windspeed,
          cloudcover:forecastData.body.currentConditions.cloudcover,
        })
      })

    })


  } else {

    forecast(req.query.address, (forecastData) => {
      if(forecastData.body === 'undefined') {
        
        res.send({
          error: forecastData.Error
        })

      } else {
          res.send({
          weatherData:forecastData.body,
          icon:forecastData.body.currentConditions.icon,
          temp:forecastData.body.currentConditions.temp,
          humidity:forecastData.body.currentConditions.humidity,
          windspeed:forecastData.body.currentConditions.windspeed,
          cloudcover:forecastData.body.currentConditions.cloudcover,
           })
          }
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

app.listen(port, () => {
  console.log("Server is on port " +port)
});

