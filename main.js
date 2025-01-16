async function getWeather(city) {
    let response = await fetch ("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f1f4f23e61d413adec52958696923337&lang=ru&units=metric");
    let data = await response.json();
    console.log(data);
    return data
}

const search = document.querySelector(".search_js");
const btn = document.querySelector(".btn_js");
const container = document.querySelector(".container_js");

function addDeleteHandler(button, card) {
    button.addEventListener("click", function () {
        card.remove(); 
        localStorage.setItem("struct", container.innerHTML);
    });
}

function restoreCards() {
    container.innerHTML = localStorage.getItem("struct") || ""; 
    const deleteButtons = container.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        const card = btn.closest(".cell"); 
        addDeleteHandler(btn, card); 
    });
}

search.onkeypress = function(e){
    if (e.keyCode == 13) {
        btn.click();
    }
};

restoreCards();

btn.addEventListener ("click", async function(){
    let currentWeather = await getWeather (search.value);
    if (currentWeather.name != undefined){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        container.appendChild(cell);
        
        const currentCity = document.createElement("p");
        cell.appendChild(currentCity);
        currentCity.innerHTML = currentWeather.name;
        
        
        const currentCountry = document.createElement("p");
        cell.appendChild(currentCountry);
        currentCountry.innerHTML = "Страна: " +  currentWeather.sys.country;
        
        const iconWeather = document.createElement("img");
        cell.appendChild(iconWeather);
        const iconCode = currentWeather.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        iconWeather.src = iconUrl;

        const typeWeather = document.createElement("p");
        cell.appendChild(typeWeather);
        typeWeather.innerHTML = currentWeather.weather[0].description;
        
        const tempWeather = document.createElement("p");
        cell.appendChild(tempWeather);
        tempWeather.innerHTML = "Температура: " + Math.round(currentWeather.main.temp) + "°C";
        
        const tempFeelsWeather = document.createElement("p");
        cell.appendChild(tempFeelsWeather);
        tempFeelsWeather.innerHTML = "Ощущается как: " + Math.round(currentWeather.main.feels_like)+ "°C";

        const humidityWeather = document.createElement("p");
        cell.appendChild(humidityWeather);
        humidityWeather.innerHTML = "Влажность: " + currentWeather.main.humidity + "%";

        const windSpeedWeather = document.createElement("p");
        cell.appendChild(windSpeedWeather);
        windSpeedWeather.innerHTML = "Ветер: " + currentWeather.wind.speed + "м/с";

        const pressureWeather = document.createElement("p");
        cell.appendChild(pressureWeather);
        pressureWeather.innerHTML = "R: " + currentWeather.main.pressure + " мм рт.ст.";

        const deleteBtn = document.createElement("button");
        cell.appendChild(deleteBtn);
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "Удалить";

        addDeleteHandler(deleteBtn, cell);

        localStorage.setItem("struct", container.innerHTML);

        search.value = "";
    }
    else{
        alert("Город не найден");
        search.value = "";
    }
});

