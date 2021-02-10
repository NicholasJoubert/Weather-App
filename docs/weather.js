
var weather;

var date = document.getElementById("date");
var sunrise = document.getElementById("sunrise");
var sunset = document.getElementById("sunset");
var tempHigh = document.getElementById("tempHigh");
var templow = document.getElementById("tempLow");
var currentTemp = document.getElementById("currentTemp");
var windSpeed = document.getElementById("windSpeed");
var windDirection = document.getElementById("windDirection");
var place = document.getElementById("place");
var description = document.getElementById("description");
var cityInput = ""

// present date 
now = new Date()
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
date.innerHTML = now.getDate()+" "+ months[now.getMonth()];


// function takes permeters epoch and timezone to convert the epoch to a given timezone
var epochToTime = function(x,timezone){
  var myDate = new Date( x *1000);
  var timeZoneOffset = myDate.getTimezoneOffset();
  var clientTimeDifference = timeZoneOffset/-60; 

  hrs = myDate.getHours();
  mins = myDate.getMinutes();
  if(mins<10){
    mins = "0"+mins;
  }

  var tzFormat = timezone/3600;

  if(tzFormat<0){
    console.log("timezone less then zero")
    hrs+=24;
  }
  hrs += tzFormat-clientTimeDifference; 
  hrs = hrs%24;

  return hrs +":"+mins;
}

var cPoint = function(x){
  var point;
  if(x>=23&x<68){
    point = "NE";
  }
  else if(x>=68&x<113){
    point = "E";
  }
  else if(x>=113&x<158){
    point = "SE";
  }
  else if(x>=158&x<203){
    point = "S";
  }
  else if(x>=203&x<248){
    point = "SW";
  }
  else if(x>=248&x<293){
    point = "W";
  }
  else if(x>=293&x<338){
    point = "NW";
  }
  else if(x>=338&x<=360|x>=0&x<23){
    point = "N";
  }
  return point;
}


function msToTime(ms) {

    var mins = ms/1000/60%60;
    var hrs = ms/1000/60/60%24;
  
    return hrs + ':' + mins;
  }

function metersPerSecondToKnots(x){
  return x*1.94384;
}

// data fetching function
var update = function(){
  
  cityInput= document.getElementById("cityInput").value;

  fetch(
'http://api.openweathermap.org/data/2.5/weather?q='+cityInput+'&units=metric&appid=8f89153b8dc8523388fc39c387ca7c37')
.then(response => response.json())
.then(data => {
    weather = data;
    let timezone = data.timezone;
    let sunsetValue = epochToTime(data.sys.sunset,timezone);
    let sunriseValue = epochToTime(data.sys.sunrise,timezone);
    let tempHighValue = data.main.temp_max;
    let tempLowValue = data.main.temp_min;
    let tempCurrentValue = data.main.temp;
    let windSpeedValue = data.wind.speed;
    let windDirectionValue = data.wind.deg;

    
    
    sunset.innerHTML = sunsetValue;
    sunrise.innerHTML = sunriseValue;
    tempHigh.innerHTML = Math.round(tempHighValue)+String.fromCharCode(176);
    tempLow.innerHTML = Math.round(tempLowValue)+String.fromCharCode(176);
    currentTemp.innerHTML = Math.round(tempCurrentValue)+String.fromCharCode(176);
    windSpeed.innerHTML = Math.round(metersPerSecondToKnots(windSpeedValue))+" Knots";
    windDirection.innerHTML = cPoint(windDirectionValue);
    place.innerHTML = data.name+", "+data.sys.country;
    description.innerHTML = data.weather[0].description;
    
}

)
.catch(err => alert("Wrong City Name"))
}












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


