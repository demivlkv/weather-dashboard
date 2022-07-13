const currentDay = moment().format('L');

let cityInputEl = document.getElementById('search-city');

// access weather api
const apiKey = 'e3de8be511a273af8a582c5c16284223';

const weather = {};

// create onclick addEventListener for search button
$('#search-btn').on('click', function(event) {
  event.preventDefault();

  // display current date
  //$('#current-day').text();

  getWeather();
});

function getWeather() {
  // get value from input element
  let searchCity = cityInputEl.value.trim();

  // convert city to latitude & longitude
  let xyApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&appid=' + apiKey;

  fetch(xyApi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    let lat = data[0].lat;
    let lon = data[0].lon;
    let city = data[0].name;

    $('#current-city').text(city);

    let weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

    fetch(weatherApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);

      $('#current-city').append(' (' + currentDay + ') <img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png" alt="' + data.current.weather[0].description + '"/>');
      $('#current-temp').text(data.current.temp + '° F');
      $('#current-wind').text(data.current.wind_speed);
      $('#current-humidity').text(data.current.humidity);
      $('#uv-index').text(data.current.uvi);

    })
  })
};