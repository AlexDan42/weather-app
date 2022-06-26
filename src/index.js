let dateElement = document.querySelector("#day-today");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let cityForm = document.querySelector("#form-city");
cityForm.addEventListener("submit", submit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayToday = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayToday];

  return `${day} ${hours}:${minutes}`;
}

function showWeatherNow(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp-today").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "808089e1d4946a24c7d4573c4e5590b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherNow);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "808089e1d4946a24c7d4573c4e5590b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherNow);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
