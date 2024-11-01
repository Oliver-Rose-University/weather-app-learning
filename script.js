document.getElementById("humidity-slider").disabled = true;
document.getElementById("wind-slider").disabled = true;
document.getElementById("temp-slider").disabled = true;

const humidityAmount = document.getElementById("humidity-amount");
const windAmount = document.getElementById("wind-amount");
const tempAmount = document.getElementById("temp-amount");
const humiditySlider = document.getElementById("humidity-slider");
const windSlider = document.getElementById("wind-slider");
const tempSlider = document.getElementById("temp-slider");
const leafAnimations = document.getElementsByClassName("leaf");
const humidityFilter = document.getElementById("humidity-filter");
const windDirection = document.getElementById("wind-direction");
const windNumber = document.getElementById("wind-number");

const apiUrl = "http://localhost:5500/test.json";
// const apiUrl = "http://api.weatherstack.com/current";
const urlParams = {
    query: "Norwich",
    access_key: "2574e440f8fc0d81d16247be9385a1c9",
};

async function fetchData(){
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("Response Status: ", response.status);
        }
        const json = await response.json();
        console.log(json);
        updateData(json);
    } catch(error){
        console.error(error);
    }
    
}



function updateData(json) {
    humidityAmount.innerHTML = ("The current Humidity is: " + json.current.humidity + "%!");
    humiditySlider.value = (json.current.humidity);
    windAmount.innerHTML = ("The current Wind Speed is: " + json.current.wind_speed + "/Mph!");
    windSlider.value = (json.current.wind_speed);
    tempAmount.innerHTML = (json.current.temperature + "ºC");
    tempSlider.value = (json.current.temperature);

    const newDuration = (50 - Number(json.current.wind_speed)) * 11 / 50 + 1;
    for(const leaf of leafAnimations){
        leaf.style.animationDuration = newDuration + "s";
    }
    humidityFilter.style.opacity = 0.5 * json.current.humidity / 100;

    console.log("rotate("+json.current.wind_degree+")")
    windDirection.style.transform = "rotate("+json.current.wind_degree+"deg)";
    windNumber.innerHTML = "The Wind Direction is currently: " + json.current.wind_degree +"º!"
}


// setInterval(fetchData, 500);
fetchData()