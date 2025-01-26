function checkDay() {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = today.getDay();

    for (let i = 0; i <= 4  ; i++) {
        const nextDayIndex = (dayIndex + i) % 7;
        const nextDay = days[nextDayIndex];
        document.getElementById(`currentDay${i + 1}`).innerHTML = nextDay;
    }
};

const apiKey = "7769113fa81355eb0fa271eba7fc7fa6";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric";

document.getElementById("searchButton").addEventListener('click', checkWeather);
const city = document.getElementById("search");

async function checkWeather() {
    const response = await fetch(apiUrl + `&q=${city.value}` + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    if (data.cod == '404') {
        alert(data.message);
    }
    

    document.querySelector("#city").innerHTML = data.city.name;
    document.querySelector("#humidity").innerHTML = data.list[0].main.humidity;
    document.querySelector("#wind").innerHTML = `${data.list[0].wind.speed}km/h`;

    for(let i = 0; i < 5; i++){
        const index = i * 8;
        const icon = document.getElementById(`icon${i+1}`);


        if (index < 39 ) {
            
          if (data.list[index].weather[0].main === 'Rain') {
            icon.src = './assets/icons/animated/rainy-6.svg';
            }else if (data.list[index].weather[0].main === 'Clear') {
                icon.src = './assets/icons/animated/day.svg';
            }else if (data.list[index].weather[0].main === 'Clouds') {
                icon.src = './assets/icons/animated/cloudy.svg';
            }else if (data.list[index].weather[0].main === 'Snow') {
                icon.src = './assets/icons/animated/snowy-6.svg';
            }else if (data.list[index].weather[0].main === 'Thunderstorm') {
                icon.src = './assets/icons/animated/thunder.svg';
            }  

            document.querySelector(`#temp${i+1}`).innerHTML = Math.round(data.list[index].main.temp) + "°C";
            document.querySelector(`#condition${i+1}`).innerHTML = data.list[index].weather[0].main;
        
        }
    }

    if (data.list[0].weather[0].main === 'Rain') {
        document.body.style.backgroundImage = "url(./assets/images/rain.jpg)";
        }else if (data.list[0].weather[0].main === 'Clear') {
            document.body.style.backgroundImage = "url(./assets/images/clear.jpg)";
        }else if (data.list[0].weather[0].main === 'Clouds') {
            document.body.style.backgroundImage = "url(./assets/images/clouds.jpg)";
        }else if (data.list[0].weather[0].main === 'Snow') {
            document.body.style.backgroundImage = "url(./assets/images/snow.jpg)";
        }else if (data.list[0].weather[0].main === 'Thunderstorm') {
            document.body.style.backgroundImage = "url(./assets/images/thunder.jpg)";
        }
    
    checkDay();
};