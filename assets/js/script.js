let cityInputEl = document.getElementById('search-city');

// access weather api
const apiKey = 'e3de8be511a273af8a582c5c16284223';

// create onclick addEventListener for search button
$('#search-btn').on('click', function(event) {
  event.preventDefault();

  getWeather();
});

// display weather info for searched city
function getWeather() {
  let searchCity = cityInputEl.value.trim();

  // convert city to latitude & longitude
  let xyApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&appid=' + apiKey;
  
    fetch(xyApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const city = data[0].name;

  // search weather for specified city
  let weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;

    fetch(weatherApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      let currentDay = moment((data.current.dt) * 1000).format('L');

      // display current weather information on top of page
      $('#current-city').text(city);
      $('#current-city').append(' (' + currentDay + ') <img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png" alt="' + data.current.weather[0].description + '"/>');
      $('#current-temp').text('Temp: ' + Math.round(data.current.temp) + '° F');
      $('#current-wind').text('Wind: ' + Math.round(data.current.wind_speed) + ' MPH');
      $('#current-humidity').text('Humidity: ' + data.current.humidity + '%');
      $('#uv-index').append('UV Index: <span class="bg-uvi">' + data.current.uvi + '</span>');

      // display colors according to uv index
      if (data.current.uvi > 11.0) {
        $('.bg-uvi').addClass('badge-extreme');
      } else if (data.current.uvi < 11.0 && data.current.uvi > 8.0) {
        $('.bg-uvi').addClass('badge-veryhigh');
      } else if (data.current.uvi < 8.0 && data.current.uvi > 5.0) {
        $('.bg-uvi').addClass('badge-high');
      } else if (data.current.uvi < 5.0 && data.current.uvi > 2.0) {
        $('.bg-uvi').addClass('badge-moderate');
      } else if (data.current.uvi < 2.0){
        $('.bg-uvi').addClass('badge-good');
      }

      // create 5 cards to display forecast
      for (let i = 1; i < 6; i++) {    
        let forecastDate = moment((data.daily[i].dt) * 1000).format('ddd L');
        let forecastIcon = data.daily[i].weather[0].icon;
        let forecastDesc = data.daily[i].weather[0].description;
        let forecastTemp = Math.round(data.daily[i].temp.day);
        let forecastWind = Math.round(data.daily[i].wind_speed);
        let forecastHumidity = data.daily[i].humidity;

        // set div col
        const forecastCol = document.createElement('div');
        $(forecastCol).attr('class', 'col');
        $('#display-forecast').append(forecastCol);

        // set card
        const forecastCard = document.createElement('div');
        $(forecastCard).attr('class', 'forecast');
        $(forecastCol).append(forecastCard);
        const forecastCardBody = document.createElement('div');
        $(forecastCardBody).attr('class', 'card-body');
        $(forecastCard).append(forecastCardBody);

        // set forecast date
        const forecastCardH5 = document.createElement('h5');
        $(forecastCardH5).attr('class', 'card-title');
        $(forecastCardH5).text(forecastDate);
        $(forecastCardBody).append(forecastCardH5);

        // set forecast icon
        $(forecastCardBody).append('<img src="http://openweathermap.org/img/wn/' + forecastIcon + 
        '.png" alt="' + forecastDesc + '"/>');

        // set forecast temp
        const forecastCardTemp = document.createElement('p');
        $(forecastCardTemp).text('Temp: ' + forecastTemp + '° F');
        $(forecastCardBody).append(forecastCardTemp);

        // set forecast wind
        const forecastCardWind = document.createElement('p');
        $(forecastCardWind).text('Wind: ' + forecastWind + ' MPH');
        $(forecastCardBody).append(forecastCardWind);

        // set forecast humidity
        const forecastCardHumidity = document.createElement('p');
        $(forecastCardHumidity).text('Humidity: ' + forecastHumidity + '%');
        $(forecastCardBody).append(forecastCardHumidity);
      }
    })
  })
};