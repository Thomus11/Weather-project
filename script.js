
const cityinput = document.querySelector(".cityinput");
const box = document.querySelector(".box");
const weatherform = document.querySelector(".weatherform");
const ApIKEY = "ff63be2e88dc7f3e7e9dea198312af30";

function mode() {
    let element = document.body;
    element.classList.toggle("theme-toggle");
}


weatherform.addEventListener("submit",async event =>{
    event.preventDefault()
    const city = cityinput.value
    
    if(city){
       try{
          const WeatherData = await getWeatherData(city);
          displayWeatherInfo(WeatherData)
       }catch(error){
        console.log(error)
        displayError(error)
       }
    }
    else{
        displayError("please enter a city")
    }

})

async function getWeatherData(city) {
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApIKEY}&units=metric`

    const response = await fetch(APIURL)
    if(!response.ok){
        throw new Error(`could not fetch weather data`)
    }
    return await response.json()
}

function displayWeatherInfo(data){
    
    const {name :city,
           main:{temp,humidity},
           weather:[{description,id}] } = data;

           box.textContent = "";
           box.style.display = "flex"

           const citydisplay = document.createElement("h1")
           const tempdisplay = document.createElement("p")
           const humiditydisplay = document.createElement("p")
           const descdisplay = document.createElement("p")
           const WeatherEmoji = document.createElement("p")

           citydisplay.textContent = city;
           tempdisplay.textContent = `${temp}°C`
           humiditydisplay.textContent = humidity + "%";
           descdisplay.textContent = description;
           WeatherEmoji.textContent =getWeatherEmoji(id)


          tempdisplay.classList.add("tempDisplay");
          humiditydisplay.classList.add("humidityDisplay");
          descdisplay.classList.add("descDisplay");
          WeatherEmoji.classList.add("weatherEmoji")


          box.appendChild(citydisplay);
          box.appendChild(tempdisplay);
          box.appendChild(humiditydisplay);
          box.appendChild(descdisplay);
          box.appendChild(WeatherEmoji)



}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return "🌧️"; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return "🌦️"; // Rain
    if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
    if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
    if (weatherId === 800) return "☀️"; // Clear
    if (weatherId > 800) return "☁️"; // Clouds
    return "🌈"; // Default
}

function displayError(message){
   
    const box = document.querySelector(".box");
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay");

    box.textContent = "";
    box.style.display = "flex";
    box.appendChild(errorDisplay);
}