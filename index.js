const apikey = "4f26d0faf4617052cbe6fe6515bcd5e8";

const weatherData = document.getElementById("weather-data"); 
const cityInput = document.getElementById("city-input")

const form = document.querySelector("form")
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon1 = data.weather[0].icon

        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `humidity: ${Math.round(data.main.humidity)}%`,
            `wind speed: ${Math.round(data.wind.speed)} m/s`,
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}.png" alt="Weather Icon">`;
        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherData.querySelector(".description").textContent = `${description}`;

        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent = "An error occured, Please try again later.";

        weatherData.querySelector(".details").innerHTML = "";
    }
}