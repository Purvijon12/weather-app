const apiKey = '3b358cb35da60a8ca3483ca49e258dcb'; // Replace with your OpenWeatherMap API key
const apiBase = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');
  const errorDiv = document.getElementById('errorMsg');

  if (!city) {
    errorDiv.textContent = 'Please enter a city name!';
    resultDiv.style.display = 'none';
    return;
  }

  errorDiv.textContent = '';
  resultDiv.style.display = 'none';

  try {
    const response = await fetch(`${apiBase}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (response.status !== 200) {
      errorDiv.textContent = data.message || 'City not found!';
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="${desc}" />
      <p><strong>${desc}</strong></p>
      <p>🌡️ Temperature: <strong>${temp}°C</strong></p>
    `;
    resultDiv.style.display = 'block';
  } catch (error) {
    errorDiv.textContent = 'Failed to fetch weather data!';
  }
}
