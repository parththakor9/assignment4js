const API_KEY = '648ce3db6233bcba877bbe5eb414085a'; // DEFINE THE API KEY USED TO ACCESS OPENWEATHERMAP

// DYNAMICALLY ADD STUDENT INFO
document.getElementById('student-info').textContent = 'Name: Parth | Student ID: 200597138';

const cityInput = document.getElementById('city-input'); // GET THE CITY INPUT FIELD
const getWeatherButton = document.getElementById('get-weather'); // GET THE BUTTON TO FETCH WEATHER
const weatherOutput = document.getElementById('weather-output'); // GET THE CONTAINER TO DISPLAY WEATHER INFO
const appContainer = document.getElementById('app-container'); // GET THE MAIN APP CONTAINER

// EVENT LISTENER FOR BUTTON
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim(); // GET THE VALUE ENTERED AND REMOVE WHITESPACES

  if (!city) { // IF INPUT IS EMPTY
    weatherOutput.textContent = 'Please enter a city name.'; // SHOW ERROR MESSAGE
    return; // EXIT FUNCTION
  }

  fetchWeather(city); // CALL FUNCTION TO FETCH WEATHER
});

function fetchWeather(city) {
  // CONSTRUCT THE URL FOR THE API REQUEST
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  // START THE FETCH REQUEST
  fetch(url)
    .then(response => {
      // CHECK IF THE RESPONSE IS OK (STATUS CODE 200-299)
      if (!response.ok) {
        throw new Error(`City not found: ${city}`); // THROW ERROR IF CITY NOT FOUND
      }
      return response.json(); // PARSE RESPONSE AS JSON
    })
    .then(data => {
      const { name, sys, main, weather } = data; // DESTRUCTURE REQUIRED DATA FROM RESPONSE
      const iconCode = weather[0].icon; // GET WEATHER ICON CODE
      const weatherMain = weather[0].main; // GET MAIN WEATHER CONDITION (E.G., CLEAR, RAIN)
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // CONSTRUCT ICON IMAGE URL

      // UPDATE THE WEATHER INFORMATION ON THE PAGE
      weatherOutput.innerHTML = `
        <strong>📍 ${name}, ${sys.country}</strong><br />
        🌡 <strong>${main.temp}°C</strong><br />
        🌤 ${weather[0].description}<br />
        <img src="${iconUrl}" alt="Weather icon" />
      `;

      // SET BACKGROUND IMAGE BASED ON WEATHER CONDITION
      setWeatherBackground(weatherMain);
    })
    .catch(error => {
      // DISPLAY ERROR MESSAGE IF ANYTHING GOES WRONG (E.G., INVALID CITY)
      weatherOutput.textContent = `❌ Error: ${error.message}`;
    });
}

// CHANGE BACKGROUND IMAGE BASED ON WEATHER CONDITION
function setWeatherBackground(weatherMain) {
  let backgroundImage = ''; // INITIALIZE BACKGROUND IMAGE VARIABLE

  switch (weatherMain.toLowerCase()) {
    case 'clear': // IF WEATHER IS CLEAR
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?sunny,sky")';
      break;
    case 'rain': // IF WEATHER IS RAINY
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?rain,clouds")';
      break;
    case 'clouds': // IF WEATHER IS CLOUDY
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?cloudy,sky")';
      break;
    case 'snow': // IF WEATHER IS SNOWY
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?snow")';
      break;
    case 'thunderstorm': // IF WEATHER IS THUNDERSTORM
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?thunderstorm")';
      break;
    default: // FOR ANY OTHER WEATHER CONDITIONS
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather")';
  }

  // UPDATE THE BACKGROUND IMAGE DYNAMICALLY
  document.body.style.backgroundImage = backgroundImage;
}
