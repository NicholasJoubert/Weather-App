
var weather;

var date = document.getElementById("date");
var sunrise = document.getElementById("sunrise");
var sunset = document.getElementById("sunset");
var tempHigh = document.getElementById("tempHigh");
var templow = document.getElementById("tempLow");
var windSpeed = document.getElementById("windSpeed");
var windDirection = document.getElementById("windDirection");


var input = "London"




function msToTime(ms) {

    var mins = ms/1000/60%60;
    var hrs = ms/1000/60/60%24;
  
    return hrs + ':' + mins;
  }

fetch(
'http://api.openweathermap.org/data/2.5/weather?q='+input+'&units=metric&appid=8f89153b8dc8523388fc39c387ca7c37')
.then(response => response.json())
.then(data => {
    weather = data;
    let sunsetValue = data.sys.sunset;
    let sunriseValue = data.sys.sunrise;
    let tempHighValue = data.main.temp_max;
    let tempLowValue = data.main.temp_min;
    let windSpeedValue = data.wind.speed;
    let windDirectionValue = data.wind.deg;
    sunset.innerHTML = sunsetValue;
    sunrise.innerHTML = sunriseValue;
    tempHigh.innerHTML = Math.round(tempHighValue)+String.fromCharCode(176);
    tempLow.innerHTML = Math.round(tempLowValue)+String.fromCharCode(176);
    windSpeed.innerHTML = windSpeedValue;
    windDirection.innerHTML = windDirectionValue;
}

)
.catch(err => alert("Wrong City Name"))












// var input = document.querySelector('.input_text');
// var main = document.querySelector('#name');
// var temp = document.querySelector('.temp');
// var desc = document.querySelector('.desc');
// var clouds = document.querySelector('.clouds');
// var button= document.querySelector('.submit');


// button.addEventListener('click', function(name){
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=50a7aa80fa492fa92e874d23ad061374')
// .then(response => response.json())
// .then(data => {
//   var tempValue = data['main']['temp'];
//   var nameValue = data['name'];
//   var descValue = data['weather'][0]['description'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   input.value ="";

// })


