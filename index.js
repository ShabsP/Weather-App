let date = new Date();
let today = document.querySelector("#today");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentYear = date.getFullYear();
let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();

today.innerHTML = `${currentDay} ${currentMonth} ${currentDate} , ${currentYear}`;

function cityWeather(response) {
  console.log(response);
  //cityname
  let city = response.data.name;
  let location = document.querySelector("#cityName");
  location.innerHTML = city;
  //temperature
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;
  //highs
  let high = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#high");
  max.innerHTML = high;
  //low
  let low = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#low");
  min.innerHTML = low;
  //feels
  let feels = Math.round(response.data.main.feels_like);
  let description = document.querySelector("#feels");
  description.innerHTML = feels;
  //hum
  let hum = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = hum;
  //speed
  let speed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#speed");
  wind.innerHTML = speed;
}

function cityInput(event) {
  event.preventDefault();
  let apiKey = "c67edcc099e6aec8f08b9ea6ce845610";
  let units = "metric";
  let city = document.querySelector("#enterCity").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(cityWeather);
}

function showLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "c67edcc099e6aec8f08b9ea6ce845610";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(cityWeather);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", cityInput);
citySearch.addEventListener("click", cityInput);

let button = document.querySelector("#geo");
let geoButton = button.addEventListener("click", findLocation);
