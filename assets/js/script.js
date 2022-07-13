const currentDay = moment().format('L');

let cityInputEl = document.getElementById('search-city');
let searchButtonEl = document.getElementById('search-btn');

// access weather api
const apiKey = 'e3de8be511a273af8a582c5c16284223';

// display current date
$('#current-day').text('(' + currentDay + ')');

// display search history

// search for weather in specified city
/*function fetchWeather() {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?q=' + searchCity.value + '&units=imperial&appid=' + apiKey;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        console.log(data);
      })
};*/

// create onclick addEventListener for search button
$('#search-btn').on('click', function(event) {
    event.preventDefault();

    // get value from input element
    let searchCity = cityInputEl.value.trim();

    let xyApi = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + '&appid=' + apiKey;

    fetch(xyApi)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        console.log(data);
        let lat = data[0].lat;
        let lon = data[0].lon;

        let cityApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

        fetch(cityApi)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            console.log(data);
          })
      })

    //if (searchCity) {
    //    getCityInfo(searchCity);
    //    cityInputEl.value = "";
    //} else {
    //    alert('Please enter a valid city name');
    //}

    console.log(searchCity);
});

// display current city weather

// display 5-day forecast