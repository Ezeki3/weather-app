const { Store } = require('./Store');
const { Weather } = require('./Weather');
const { UI } = require('./UI');

const storage = new Store();
const { city, countryCode } = storage.getLocationData();
const weather = new Weather(city, countryCode);

// User Interface
const ui = new UI();

require('./index.css');

async function fetchWeather() {
    const data = await weather.getWeather()
    console.log(data);
    ui.render(data);
}

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value
    weather.changeLocation(city, countryCode);
    storage.setLocationData(city, countryCode);
    fetchWeather();
    console.log(city, countryCode);
    e.preventDefault();

});

document.addEventListener('DOMContentLoaded', fetchWeather);