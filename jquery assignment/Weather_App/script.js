const API_key = `76229fb6fc46c6bff2c28e15a2a099d4`
$(document).ready(function () {
    async function getData(cityName) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=metric`
        let output = await fetch(url);
        let jsonOutput = await output.json();
        console.log(jsonOutput);
        if (jsonOutput.cod === "404") {
            alert("City not found.")
            return;
        }
        $(".weatherCard").html(`
        <div class="card">
       <div class="card-body weatherCardBody p-0">
       <h4 class="p-2 weatherTitle card-title bg-success">Weather of: ${cityName.toUpperCase()}</h4>
       <div class="weatherInfo ps-2">
         <p class="card-text proppery1">Sky condition: ${jsonOutput.weather[0].description}</p>
         <p class="card-text property2">Temprature: ${jsonOutput.main.temp}°C</p>
         <p class="card-text property3">Wind speed: ${jsonOutput.wind.speed}km/h</p>
       </div>
</div>
</div>
       `)
    }

    $(".searchBtn").click(function () {
        let searchInput = $(".searchByCity").val();
        getData(searchInput);
    })

})
