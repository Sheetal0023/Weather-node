console.log('Client Side Server Is ON')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const loading = document.querySelector('#loading')
const date = document.querySelector('#date0')
const tempMessage = document.querySelector('#tempMsg0')
const address = document.querySelector('#address0')
const content = document.querySelector('#content0')
const cloudcover = document.querySelector('#cloudcover0')
const windspeed = document.querySelector('#windspeed0')

const day0 = document.querySelector('#day0')
const day1 = document.querySelector('#day1')
const day2 = document.querySelector('#day2')
const day3 = document.querySelector('#day3')
const day4 = document.querySelector('#day4')
const day5 = document.querySelector('#day5')
const day6 = document.querySelector('#day6')



loading.textContent = 'Please enter loaction'

const currentWeather = (data) => {
   
    date.textContent =data.weatherData.days[0].datetime
    tempMessage.textContent = data.temp+'°C'
    document.getElementById('iconImg0').src = '/img/'+data.icon+'.png'
    address.textContent = data.weatherData.resolvedAddress
    content.textContent = data.weatherData.description
    cloudcover.textContent = 'Cloud Coverage ' +data.cloudcover+ '%'
    windspeed.textContent = 'Wind Speed ' +data.windspeed+ 'Km/h'
}

const Day1 = (data, dayAPI, dayHTML) => {
    document.querySelector('#date'+dayHTML).textContent = data.weatherData.days[dayAPI].datetime
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
        
        loading.textContent = ''
        console.log('coords')
        currentWeather(data)  // current loaction data
        
        for(let step = 0; step < 7; step++) {
            Day1(data, step, step)
        }
        
        day0.addEventListener('click', function() {
            entireDay(data, 0, 0)
        })

        day1.addEventListener('click', function() {
            entireDay(data, 1, 1)
        })

        day2.addEventListener('click', function() {
            entireDay(data, 2, 2)
        })
        day3.addEventListener('click', function() {
            entireDay(data, 3, 3)
        })
        day4.addEventListener('click', function() {
            entireDay(data, 4, 4)
        })
        day5.addEventListener('click', function() {
            entireDay(data, 5, 5)
        })
        day6.addEventListener('click', function() {
            entireDay(data, 6, 6)
        })


        $(document).ready(function(){
            $("#day0").click(function(){
              $("#test0").toggle(500);
            });
          });

          $(document).ready(function(){
            $("#day1").click(function(){
              $("#test1").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day2").click(function(){
              $("#test2").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day3").click(function(){
              $("#test3").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day4").click(function(){
              $("#test4").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day5").click(function(){
              $("#test5").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day6").click(function(){
              $("#test6").toggle(500);
            });
          });
       
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
        
        loading.textContent = ''
        console.log('addr')
        currentWeather(data) // current loaction data
        
        for(let step = 1; step < 7; step++) {
            Day1(data, step, step)
        }

        day0.addEventListener('click', function() {
            entireDay(data, 0, 0)
        })

        day1.addEventListener('click', function() {
            entireDay(data, 1, 1)
        })

        day2.addEventListener('click', function() {
            entireDay(data, 2, 2)
        })
        day3.addEventListener('click', function() {
            entireDay(data, 3, 3)
        })
        day4.addEventListener('click', function() {
            entireDay(data, 4, 4)
        })
        day5.addEventListener('click', function() {
            entireDay(data, 5, 5)
        })
        day6.addEventListener('click', function() {
            entireDay(data, 6, 6)
        })


        $(document).ready(function(){
            $("#day0").click(function(){
              $("#test0").toggle(500);
            });
          });

          $(document).ready(function(){
            $("#day1").click(function(){
              $("#test1").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day2").click(function(){
              $("#test2").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day3").click(function(){
              $("#test3").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day4").click(function(){
              $("#test4").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day5").click(function(){
              $("#test5").toggle(500);
            });
          });
          $(document).ready(function(){
            $("#day6").click(function(){
              $("#test6").toggle(500);
            });
          });


    })
    
})


