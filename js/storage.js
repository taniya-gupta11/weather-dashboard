function saveCity(city) {
  localStorage.setItem("defaultCity", city);
}

function getSavedCity() {
  return localStorage.getItem("defaultCity") || "London";
}
