const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const loading = document.querySelector('#loading')

const day0 = document.querySelector('#day0')
const day1 = document.querySelector('#day1')
const day2 = document.querySelector('#day2')
const day3 = document.querySelector('#day3')
const day4 = document.querySelector('#day4')
const day5 = document.querySelector('#day5')
const day6 = document.querySelector('#day6')

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


loading.textContent = 'Please enter loaction'


const Days = (data, dayAPI, dayHTML) => {

    const currentDayapi =  data.weatherData.days[dayAPI].datetime
    const d = new Date(currentDayapi);
 
    document.querySelector('#dayBtn'+dayHTML).textContent = weekday[d.getDay()]
    document.querySelector('#date'+dayHTML).textContent =  weekday[d.getDay()]
    document.querySelector('#tempMsg'+dayHTML).textContent = data.weatherData.days[dayAPI].temp+'°C'
    document.getElementById('iconImg'+dayHTML).src = '/img/'+data.weatherData.days[dayAPI].icon+'.png'
    document.querySelector('#address'+dayHTML).textContent = data.weatherData.resolvedAddress
    document.querySelector('#content'+dayHTML).textContent = data.weatherData.days[dayAPI].description
    document.querySelector('#cloudcover'+dayHTML).textContent = 'Cloud Coverage ' +data.weatherData.days[dayAPI].cloudcover+ '%'
    document.querySelector('#windspeed'+dayHTML).textContent = 'Wind Speed ' +data.weatherData.days[dayAPI].windspeed+ 'Km/h'

}

const entireDay = (data, dayAPI, dayHTML) => {
    document.querySelector('#tempmax'+dayHTML).textContent = 'Temp Maximum ' +data.weatherData.days[dayAPI].tempmax+ '°C'
    document.querySelector('#tempmin'+dayHTML).textContent = 'Temp Minimum ' +data.weatherData.days[dayAPI].tempmin+ '°C'
    document.querySelector('#humidity'+dayHTML).textContent = 'Humidity ' +data.weatherData.days[dayAPI].humidity
    document.querySelector('#dew'+dayHTML).textContent = 'Dew ' +data.weatherData.days[dayAPI].dew
    document.querySelector('#visibility'+dayHTML).textContent = 'Visibility ' +data.weatherData.days[dayAPI].visibility
    document.querySelector('#uvindex'+dayHTML).textContent = 'UV Index ' +data.weatherData.days[dayAPI].uvindex
    document.querySelector('#sunrise'+dayHTML).textContent = 'Sunrise ' +data.weatherData.days[dayAPI].sunrise
    document.querySelector('#sunset'+dayHTML).textContent = 'Sunset ' +data.weatherData.days[dayAPI].sunset

}


const successCallback = (position) => {
    var lati = position.coords.latitude
    var longi = position.coords.longitude

    loading.textContent = 'Fetching your current location'

    fetch('/weather?address='+location+'&lat='+lati+'&long='+longi)
    .then(response => response.json())
    .then((data) => {


        if(data.error !== undefined) {

            loading.innerHTML = data.error

        } else {

        loading.textContent = ''

        // currentWeather(data)  // current loaction data
        
        for(let step = 0; step < 7; step++) {
            Days(data, step, step)
            entireDay(data, step, step)
        }
        
        }
    })


}



navigator.geolocation.getCurrentPosition(successCallback)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    loading.textContent = 'Loading Weather...'

    fetch('/weather?address='+location+'&lat=&long=')
    .then(response => response.json())
    .then((data) => {


        if(data.error !== undefined) {

            loading.innerHTML = data.error

        } else {
        
        loading.textContent = ''

        // currentWeather(data) // current loaction data
        
        for(let step = 0; step < 7; step++) {
            Days(data, step, step)
            entireDay(data, step, step)
        }

    }  

    })
    
})

const showHide = (dayValue) => {
    var x = document.querySelector("#test"+dayValue);
    var y = document.querySelector("#btn"+dayValue)
    if (x.style.display === "none") {
      x.style.display = "block";
      y.textContent = "Show Less"
    } else {
      x.style.display = "none";
      y.textContent = "Show More"
    }
}

day0.addEventListener('click', function() {
    showHide(0)
})

day1.addEventListener('click', function() {
    showHide(1)
})

day2.addEventListener('click', function() {
    showHide(2)
})

day3.addEventListener('click', function() {
    showHide(3)
})

day4.addEventListener('click', function() {
    showHide(4)
})

day5.addEventListener('click', function() {
    showHide(5)
})

day6.addEventListener('click', function() {
    showHide(6)
})




