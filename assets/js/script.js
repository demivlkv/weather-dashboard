// set all variables
let cityInputEl = document.getElementById('search-city');
let searchButtonEl = document.getElementById('search-btn');

// access 
const apiKey = 'e3de8be511a273af8a582c5c16284223';

// search for weather in specified city
function getApi() {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        console.log(apiUrl);
      })
};

// create onclick addEventListener for search button
$('#search-btn').on('submit', function(event) {
    event.preventDefault();

    // get value from input element
    let city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);
        cityInputEl.value = "";
    } else {
        alert('Please enter a valid city name');
    }

    console.log(city);
});

// display search history

// display current city weather

// display 5-day forecast