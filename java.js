document.getElementById("humidity-slider").disabled = true;
const humidityAmount = document.getElementById("humidity-amount");
const humidityValue = document.getElementById("humidity");

async function updateHumidity() {
    humidityAmount.innerHTML = ("The current Humidity is: " + humidityValue.value + "%!");
    
}

updateHumidity();