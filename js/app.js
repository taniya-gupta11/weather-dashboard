const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

window.onload = () => {
  const savedCity = getSavedCity();
  cityInput.value = savedCity;
  getWeather(savedCity);
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    saveCity(city);
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weatherCard.classList.add("hidden");

    const data = await fetchWeatherData(city);

    cityName.textContent = data.city;
    temperature.textContent = data.temperature;
    description.textContent = data.description;
    humidity.textContent = data.humidity;
    wind.textContent = data.wind;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

    weatherCard.classList.remove("hidden");
  } catch (err) {
    error.textContent = err.message;
    error.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}
