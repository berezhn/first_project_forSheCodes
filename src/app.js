let currentTime = new Date();
let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
let day = days[currentTime.getDay()];
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
  "December"
];
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

function showTemerature(response) {
  let localCity = document.querySelector("#selected-city");
  let descriptionElement = document.querySelector("#description");
  let requestCityTemp = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  let visibilityElement = document.querySelector("#visibility");
  let iconElement = document.querySelector("#icon-main");

  celsiusTemperature = response.data.main.temp;

  localCity.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  requestCityTemp.innerHTML = Math.round(celsiusTemperature);
  humidityElement.innerHTML = `${response.data.main.humidity} %`;
  pressureElement.innerHTML = response.data.main.pressure;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  visibilityElement.innerHTML = `${Math.round(response.data.visibility)/1000} km`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  console.log(response.data);
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".form-control");
  let newCity = document.querySelector("#selected-city");
  if (inputCity.value) {
    newCity.innerHTML = `${inputCity.value}`;
  } 

  let apiKey = "d249412306d1588b619a3dbbbac6d342";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemerature);
}
let inputForm = document.querySelector(".input-group");
inputForm.addEventListener("click", changeCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d249412306d1588b619a3dbbbac6d342";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemerature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let buttonLocalPosition = document.querySelector("#current-location");
buttonLocalPosition.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);
