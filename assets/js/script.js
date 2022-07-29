let cities;
const cityInputEl = document.getElementById('search-city');
const apiKey = 'e3de8be511a273af8a582c5c16284223';

// populate sidebar with previously searched cities
loadCities();

// load previously searched location for returning user
if (localStorage.getItem('cities') !== null) {
  lastViewed();
};

// onclick event listener for search button
$('#search-btn').on('click', function(event) {
  let searchCity = cityInputEl.value.trim();

  // get weather unless input left blank
  if (searchCity) {
    getWeather(searchCity);
    $('#search-city').val('');
  } else {
    alert('Please enter a valid city name.');
    return;
  }

  // check for city in previous searches
  if (localStorage.getItem('cities') === null) {
    cities = [];
  } else {
    cities = JSON.parse(localStorage.getItem('cities'));
  }

  // add city into array
  if (cities.includes(searchCity) === false) {
    cities.push(searchCity);
  }

  saveCity();
  display();
});

// display weather info for entered city
function getWeather(getCity) {
  let searchCity = getCity || cityInputEl.value.trim();

  // find latitude & longitude values from city name
  let xyApi = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&appid=' + apiKey;
  
  fetch(xyApi)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayWeather(data, getCity);
        });
      } else {
        alert('Please enter a valid city.');
        return;
      }
    })
    .catch(function(error) {
      if (response.status != 200) {
        alert('Unable to connect to server.');
        $('#search-city').val('');
      }
    });
};

function displayWeather(data, getCity) {
      // console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      const city = data[0].name;
      const country = data[0].country;

    // search weather for specified city with lat & lon
    let weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + apiKey;

    fetch(weatherApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(weather) {
      // console.log(weather);
      // clears input
      $('#current-icon').html('');
      $('#current-city').html('');
      $('#current-wind').html('');
      $('#current-humidity').html('');
      $('#uv-index').html('');

      // get current date of searched city according to timezone
      let currentDay = moment(weather.current.dt * 1000 + (weather.timezone_offset * 1000)).format('dddd, l');

      // display current weather information of city
      $('#current-icon').append('<img src="./assets/images/icons/' + weather.current.weather[0].icon + '.svg" alt="' + weather.current.weather[0].description + '"/>');
      $('#current-city').append('<p class="current-temp">' + Math.round(weather.current.temp) + '° F</p><p>' + weather.current.weather[0].description + '</p><h2><i class="fa-solid fa-location-dot"></i> ' + city + ', ' + country + '</h2><p class="current-date">' + currentDay + '</p>');
      $('#current-wind').append('<strong>Wind:</strong><br />' + Math.round(weather.current.wind_speed) + ' MPH');
      $('#current-humidity').append('<strong>Humidity:</strong><br />' + weather.current.humidity + '%');
      $('#uv-index').append('<strong>UV Index:</strong><br /><span class="bg-uvi">' + weather.current.uvi + '</span>');

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

      // clears input
      $('#display-forecast').html('');

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
        $(forecastCol).attr('class', 'col-sm');
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
        '.svg" alt="' + forecastDesc + '"/>');

        // set forecast temp
        const forecastCardTemp = document.createElement('p');
        $(forecastCardTemp).attr('class', 'forecast-temp');
        $(forecastCardTemp).append(forecastTemp + '° F');
        $(forecastCardBody).append(forecastCardTemp);

        // set forecast wind
        const forecastCardWind = document.createElement('p');
        $(forecastCardWind).html('<strong>Wind:</strong> ' + forecastWind + ' MPH');
        $(forecastCardBody).append(forecastCardWind);

        // set forecast humidity
        const forecastCardHumidity = document.createElement('p');
        $(forecastCardHumidity).html('<strong>Humidity:</strong> ' + forecastHumidity + '%');
        $(forecastCardBody).append(forecastCardHumidity);
      }
    })
};

// save to local storage
function saveCity() {
  localStorage.setItem('cities', JSON.stringify(cities));
};

// load sidebar with previous searches
function loadCities(searchCity) {
  cities = JSON.parse(localStorage.getItem('cities'));
  // limit cities shown in search history
  // cities = cities.splice(-5);

  $('#search-history').html('');

  // create list item for each city input in reverse order
  if (cities) {
    for (i = cities.length - 1; i >= 0; i--) {
      let city = cities[i];

      const btnEl = document.createElement('button');
      btnEl.textContent = city;
      $(btnEl).attr('id', 'city-list');
      $(btnEl).attr('class', 'list-group-item list-group-item-action text-capitalize');
      $(btnEl).attr('data-city', city);
      $('#search-history').append(btnEl);
    }
  }
};

// make search history buttons clickable
$('#search-history').on('click', 'button#city-list', function(event) {
  let getCity = $(this).attr('data-city');
  // clears input
  $('#search-city').val('');

  getWeather(getCity);
  organizeArr(getCity);
});

// clear history on click
$('#clear-btn').on('click', function(event) {
  localStorage.clear(cities);
  window.location.reload();
});

// re-orders list after clicking city from search history
function organizeArr(city) {
  var cityList = JSON.parse(localStorage.getItem('cities'));
  cities = [];

  for (i = 0; i < cityList.length; i++) {
    if (cityList[i].toLowerCase() !== city.toLowerCase()) {
      cities.push(cityList[i]);
    }
  }

  cities.push(city);
  localStorage.setItem('cities', JSON.stringify(cities));
  loadCities();
};

// get weather for last viewed city upon page reload
function lastViewed() {
  let cities = JSON.parse(localStorage.getItem('cities'));
  let city = cities.slice(-1).pop();
  $('#search-city').val('');
  getWeather(city);
  display();
};

// display & hide items on page
function display() {
  $('.btn').removeClass('hide');
  $('.current-weather').removeClass('hide');
  $('.forecast-h3').removeClass('hide');
  $('.compass').addClass('hide');
};