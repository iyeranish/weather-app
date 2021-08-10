var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();
var day = today.getDay();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

let weather = {
  apiKey: "API KEY GOES HERE",
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then(response => response.json())
      .then(data => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { speed } = data.wind;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { country } = data.sys;
    document.querySelector('.city').innerText = `${name} , ${country}`;
    document.querySelector(
      '.date'
    ).innerText = `${weekday[day]} ${date} ${months[month]} ${year} `;
    document.querySelector(
      '.icon'
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.temp').innerText = temp + ' °C';
    document.querySelector('.description').innerText = description;
    document.querySelector('.humidity').innerText =
      'Humidity : ' + humidity + ' %';
    document.querySelector('.wind').innerText =
      'Wind Speed : ' + speed + ' km / hr';
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?landscape," + name + "')";
    document.querySelector('.weather').classList.remove('loading');
  },

  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      weather.search();
    }
  });
