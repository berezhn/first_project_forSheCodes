let currentDate = document.querySelector(".current-date");

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
currentDate.innerHTML = `${day}, ${month} ${date}`;

function showTemerature(response) {
  let temperature = Math.round(response.data.main.temp);
  let requestCityTemp = document.querySelector("#current-temp");
  requestCityTemp.innerHTML = temperature;
  console.log(response.data.name);
  let localCity = document.querySelector("#selected-city");
  localCity.innerHTML = response.data.name;
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

let buttonLocalPosition = document.querySelector("#current-location");
buttonLocalPosition.addEventListener("click", getCurrentPosition);
