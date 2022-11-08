const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutPut = document.querySelector(".date");
const timeOutPut = document.querySelector(".time");
const conditionOutPut = document.querySelector(".condition");
const nameOutPut = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutPut = document.querySelector(".cloud");
const humidityOutPut = document.querySelector(".humidity");
const windOutPut = document.querySelector(".wind");
const form = document.getElementById(".locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".city");
const API_KEY= "c5c6df7a6460422180e154237220811";

//const api = process.env.API_KEY
//defualt city when the page loads
let cityInput = "London";

//Add click event to each city in the panel
Array.from(cities).forEach((city) => {
  city.addEventListener("click", (e) => {
    //change default city to the city clicked
    cityInput = e.target.innerHTML;
    //function that fetches the weather data
    fetchWeatherData();
    //fade out the app simple animation
    app.style.opacity = "0";
  });
});
//Add submit event to the form
form?.addEventListener("submit", (e) => {
    //if the input is empty
  if (search.value.length == 0) {
    alert("Please enter a city name");
  } else {
    //change the default city to the city entered
    cityInput = search.value;
    //fetch the weather data
    fetchWeatherData();
    //remove all text from input field
    search.value = "";
    //fade out the app simple animation
    app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek() {
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
 
}
console.log('hola2')

function fetchWeatherData() {
    //fetch the weather data from the api
    //using my own Key
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}&aqi=no`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);


      temp.innerHTML = data.current.temp_c + "&#176;"
      conditionOutPut.innerHTML = data.current.condition.text;


      const date = data.loaction.localtime;
      const y = parseInt(date.subr(0, 4));
      const m = parseInt(date.subr(5, 2));
      const d = parseInt(date.subr(8, 2));
      const time = date.substr(11);


      dateOutPut.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} ${m} ${y}`;
      timeOutPut.innerHTML = time;
      nameOutPut.innerHTML = data.location.name;


      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length);
      icon.src = "./icons/" + iconId;
      
      //Add the weather details to the page
      cloudOutPut.innerHTML = data.current.cloud + "%";
      humidityOutPut.innerHTML = data.current.humidity + "%";
      windOutPut.innerHTML = data.current.wind_mph + "km/h";

      //Set defualt time of the day
      let timeOfDay = "day";
      const code = data.current.condition.code;

      //change to if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        app.style.backgroundImage = `url('./images/${timeOfDay}/clear.jpg')`;
        btn.style.background = "#e5ba92";

        if (timeOfDay === "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url('./images/${timeOfDay}/cloudy.jpg')`;
        btn.stlye.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url('./images/${timeOfDay}/rainy.jpg')`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url('./images/${timeOfDay}/snowy.jpg')`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })
    .catch((err) => {
      alert("Please enter a valid city name");
      console.log(err);
      app.style.opacity = "1";
    });
}
fetchWeatherData();
 