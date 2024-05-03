console.log('Client Side Server Is ON')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const loading = document.querySelector('#loading')
const date = document.querySelector('.date')
const tempMessage = document.querySelector('#tempMsg')
const address = document.querySelector('#address')
const content = document.querySelector('#content')
const cloudcover = document.querySelector('#cloudcover')
const windspeed = document.querySelector('#windspeed')

const dateNext = document.querySelector('.date-next')
const tempMessageNext = document.querySelector('#tempMsg-next')
const addressNext = document.querySelector('#address-next')
const contentNext = document.querySelector('#content-next')
const cloudcoverNext = document.querySelector('#cloudcover-next')
const windspeedNext = document.querySelector('#windspeed-next')

loading.textContent = 'Please enter loaction'

const currentWeather = (data) => {
   
    date.textContent =data.weatherData.days[0].datetime
    tempMessage.textContent = data.temp+'°C'
    document.getElementById('iconImg').src = '/img/'+data.icon+'.png'
    address.textContent = data.weatherData.resolvedAddress
    content.textContent = data.weatherData.description
    cloudcover.textContent = 'Cloud Coverage ' +data.cloudcover+ '%'
    windspeed.textContent = 'Wind Speed ' +data.windspeed+ 'Km/h'
}

const nextDay = (data) => {
    dateNext.textContent =data.weatherData.days[1].datetime
    tempMessageNext.textContent = data.weatherData.days[1].temp+'°C'
    document.getElementById('iconImg-next').src = '/img/'+data.weatherData.days[1].icon+'.png'
    addressNext.textContent = data.weatherData.resolvedAddress
    contentNext.textContent = data.weatherData.days[1].description
    cloudcoverNext.textContent = 'Cloud Coverage ' +data.weatherData.days[1].cloudcover+ '%'
    windspeedNext.textContent = 'Wind Speed ' +data.weatherData.days[1].windspeed+ 'Km/h'

}

const successCallback = (position) => {
    var lati = position.coords.latitude
    var longi = position.coords.longitude

    loading.textContent = 'Fetching your current location'

    fetch('http://localhost:3000/weather?address='+location+'&lat='+lati+'&long='+longi)
    .then(response => response.json())
    .then((data) => {
        
        loading.textContent = ''
        console.log('coords')
        currentWeather(data)  // current loaction data
        nextDay(data)
       
    })



}

navigator.geolocation.getCurrentPosition(successCallback)




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    loading.textContent = 'Loading Weather...'

    fetch('http://localhost:3000/weather?address='+location+'&lat=&long=')
    .then(response => response.json())
    .then((data) => {
        
        loading.textContent = ''
        console.log('addr')
        currentWeather(data) // current loaction data
        nextDay(data)
    })
    
})