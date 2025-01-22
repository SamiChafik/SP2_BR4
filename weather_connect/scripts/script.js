const apiKey = "7769113fa81355eb0fa271eba7fc7fa6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

document.getElementById("searchButton").addEventListener('click', checkWeather);

    const city = document.getElementById("search");
    // const city = 'marrakesh';

async function checkWeather() {
    const response = await fetch(apiUrl + `&q=${city.value}` + `&appid=${apiKey}`);
    var data = await response.json();
    const icon = document.getElementById("icon");

    console.log(data);
    
    document.querySelector("#condition").innerHTML = data.weather[0].main;
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity;
    document.querySelector("#wind").innerHTML = `${data.wind.speed}Km/H`;

    if (data.weather[0].main == 'Clouds') {
        icon.src = './assets/icons/animated/cloudy.svg';
    }else {icon.src = './assets/icons/animated/day.svg'}

    checkDay();
};

function checkDay() {
    const today = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = today.getDay();
        const currentDay = days[dayIndex];
        document.getElementById("currentDay").innerHTML = currentDay;
}


