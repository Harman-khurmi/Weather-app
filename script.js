const apikey = "c0192881e22ded2b8c5833aaa02faac2";
const url = "https://api.openweathermap.org/data/2.5/weather";

let tempElement = document.querySelector("#temp");
let cityElement = document.querySelector("#city");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let btn = document.querySelector("#btn");
let input = document.querySelector("#input");
let weatherImage = document.querySelector("#weather-image");
let infoDiv = document.querySelector("#failInfo");
let dataContent = document.querySelectorAll(".dataContent");
let card = document.querySelector("#card");

const weatherIcons = {
    "Clouds": "/images/cloudy.png",
    "Clear": "/images/sun.png",
    "Rain": "/images/storm.png",
    "Drizzle": "/images/drizzle.png",
    "Mist": "/images/mist.png",
    "Snow": "/images/snow.png"
};

window.onload = emptyInfo();
function emptyInfo() {
    dataContent.forEach((element) => {
        element.classList.add("hidden");
        card.classList.remove("h-[70%]");
        card.classList.add("h-fit-content");
        element.classList.add("h-0");
    });
}


function showInfo() {
    dataContent.forEach((element) => {
        element.classList.remove("hidden");
        element.classList.remove("h-0");
        card.classList.add("h-[70%]");
    });
}

async function checkWeather(city) {
    const response = await fetch(`${url}?q=${city}&appid=${apikey}&units=metric`);
    let data = await response.json();
    // console.log(data);
    if (data.cod === "404") {
        emptyInfo();
        infoDiv.classList.remove("hidden");
        infoDiv.innerHTML = `${data.message}`;
        return;
    } else {
        showInfo();
        infoDiv.classList.add("hidden");
        tempElement.innerHTML = Math.round(data.main.temp) + "°C";
        cityElement.innerHTML = data.name;
        humidityElement.innerHTML = data.main.humidity + "%";
        windElement.innerHTML = data.wind.speed + " km/h";
        // if (data.weather[0].main === "Clouds") {
        //     weatherImage.src = "/images/cloudy.png";
        // } else if (data.weather[0].main === "Clear") {
        //     weatherImage.src = "/images/sun.png";
        // } else if (data.weather[0].main === "Rain") {
        //     weatherImage.src = "/images/storm.png";
        // } else if (data.weather[0].main === "Drizzle") {
        //     weatherImage.src = "/images/drizzle.png";
        // } else if (data.weather[0].main === "Mist") {
        //     weatherImage.src = "/images/mist.png";
        // } else {
        //     weatherImage.src = "/images/snow.png";
        // }
        weatherImage.src = weatherIcons[data.weather[0].main] || "Image not found";
    }
}


// Function to handle search
function handleSearch() {
    // trim to remove extra spaces from start and end
    if (input.value.trim() !== "") {
        checkWeather(input.value);
        input.value = "";
    }
}

// Click event on button
btn.addEventListener("click", handleSearch);

// Enter key event on input field
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});