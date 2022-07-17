let cityInputEl = document.getElementById('search-city');
let cities = {};

// access weather api
const apiKey = 'e3de8be511a273af8a582c5c16284223';

// check localstorage for last viewed city, then load it
if (localStorage.getItem('cities') !== null) {
  // clear input field
  $('#search-city').empty();

  lastViewed();
  getWeather();
};

loadCities();

// load sidebar with previous searches
function loadCities() {
  // search localstorage
  cities = JSON.parse(localStorage.getItem('cities'));

  // create list item for each city input in reverse order
  if (cities) {
    for (i = cities.length -1; i >= 0; i--) {
      let city = cities[i];

      const btnEl = document.createElement('button');
      btnEl.textContent = city;
      $(btnEl).attr('id', 'city-list');
      $(btnEl).attr('class', 'list-group-item list-group-item-action text-capitalize');
      $(btnEl).attr('data-city', city);
      $('#search-history').append(btnEl);

      // make button clickable
      $(btnEl).on('click', function() {
        let getCity = $(this).attr('data-city');
        getWeather(getCity);
        window.location.reload();
      });
    }
  }
};

// load last viewed city before page refresh
function lastViewed() {
  let cities = JSON.parse(localStorage.getItem('cities'));
  let city = cities.slice(-1).pop();
  $('#search-city').val(city);
}

// display weather info for searched city
function getWeather() {
  let searchCity = cityInputEl.value.trim();

  // find latitude & longitude values from city name
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

  // search weather for specified city with found lat & lon
  let weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;

    fetch(weatherApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(weather) {
      console.log(weather);

      // get current date of searched city according to timezone
      let currentDay = moment(weather.current.dt * 1000 + (weather.timezone_offset * 1000)).format('L');

      // display current weather information of city
      $('#current-city').text(city);
      $('#current-city').append(' (' + currentDay + ') <img src="./assets/images/icons/' + weather.current.weather[0].icon + '.png" alt="' + weather.current.weather[0].description + '"/>');
      $('#current-temp').text('Temp: ' + Math.round(weather.current.temp) + '° F');
      $('#current-wind').text('Wind: ' + Math.round(weather.current.wind_speed) + ' MPH');
      $('#current-humidity').text('Humidity: ' + weather.current.humidity + '%');
      $('#uv-index').append('UV Index: <span class="bg-uvi">' + weather.current.uvi + '</span>');

      // display colors according to uv index
      if (weather.current.uvi > 11.0) {
        $('.bg-uvi').addClass('badge-extreme');
      } else if (weather.current.uvi < 11.0 && weather.current.uvi > 8.0) {
        $('.bg-uvi').addClass('badge-veryhigh');
      } else if (weather.current.uvi < 8.0 && weather.current.uvi > 5.0) {
        $('.bg-uvi').addClass('badge-high');
      } else if (weather.current.uvi < 5.0 && weather.current.uvi > 2.0) {
        $('.bg-uvi').addClass('badge-moderate');
      } else if (weather.current.uvi < 2.0){
        $('.bg-uvi').addClass('badge-good');
      }

      // create 5 cards to display forecast
      for (let i = 1; i < 6; i++) {    
        let forecastDate = moment((weather.daily[i].dt) * 1000).format('ddd M/D');
        let forecastIcon = weather.daily[i].weather[0].icon;
        let forecastDesc = weather.daily[i].weather[0].description;
        let forecastTemp = Math.round(weather.daily[i].temp.day);
        let forecastWind = Math.round(weather.daily[i].wind_speed);
        let forecastHumidity = weather.daily[i].humidity;

        // set div col
        const forecastCol = document.createElement('div');
        $(forecastCol).attr('class', 'col');
        $('#display-forecast').append(forecastCol);

        // set card
        const forecastCard = document.createElement('div');
        $(forecastCard).attr('class', 'forecast rounded');
        $(forecastCol).append(forecastCard);
        const forecastCardBody = document.createElement('div');
        $(forecastCardBody).attr('class', 'card-body');
        $(forecastCard).append(forecastCardBody);

        // set forecast dates
        const forecastCardH5 = document.createElement('h5');
        $(forecastCardH5).attr('class', 'card-title');
        $(forecastCardH5).text(forecastDate);
        $(forecastCardBody).append(forecastCardH5);

        // set forecast icon
        $(forecastCardBody).append('<img src="./assets/images/icons/' + forecastIcon + 
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

// onclick event listener for search button
$('#search-btn').on('click', function(event) {
  let searchCity = cityInputEl.value.trim();

  // clear input field
  //$('#search-city').empty();

  // do nothing if input field left blank, otherwise get weather
  if (searchCity === "") {
    return;
  } else {
    getWeather(searchCity);
    searchCity.value = '';
  }

  // check for city in array
  if (cities === null) {
    cities = [];
  }

  // add city into array
  cities.push(searchCity);

  // save to local storage
  localStorage.setItem('cities', JSON.stringify(cities));
});

// clear history on click
$('#clear-btn').on('click', function() {
  localStorage.clear(cities);
  window.location.reload();
});