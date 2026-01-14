const API_KEY = "39206fd1fdfeb3eb4277ab40e20dc3af";

// Current Weather
async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("City not found or API error");

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
  };
}

// 5-Day Forecast
async function fetchForecastData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("Forecast data not found");

  const data = await response.json();
  // Filter forecast for 12:00 PM each day
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  return daily.map(item => ({
    date: item.dt_txt.split(" ")[0],
    temp: item.main.temp,
    description: item.weather[0].description,
    icon: item.weather[0].icon
  }));
}
