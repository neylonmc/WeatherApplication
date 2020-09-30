var APIKey          = "69b49d9a8462f9c7fe09dc87b6f1c4c2"
let cardRow         = $(".card-row");
var searchTerm      = $("#searchTermBox"); 

//Find search term to be displayed and store it to local storage
function displayWeather(event) {
    event.preventDefault();
    if (searchTerm.val().trim() !==""){
        city=searchTerm.val().trim();
        currentWeather(city);
        
    var newQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch (newQuery)
    .then(weather=> {
    return weather.json()
    }).then(city)
    
        
        var key= ('city'); 
        var value = $(this).siblings("#searchTermBox").val();
        localStorage.setItem(key, JSON.stringify(value));
        function getValue() {
            return localStorage.getItem(JSON.stringify(value));
        }
    }
}
//get current weather to appear in HTML
function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; 
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(weather){
        let city = document.querySelector('.city');
        city.innerText = `${weather.name}`;
     
        let locationIcon = document.querySelector('.imageLogo'); 
        const iconImage = weather.weather[0].icon;
        locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconImage}.png"/>`;
     
        let temperature = document.querySelector('#temperatureAPI');
        temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;
     
        let humidity = document.querySelector('#humidityAPI');
        humidity.innerHTML = `${(weather.main.humidity)}<span>%</span>`;  
        
        let windSpeed = document.querySelector('#windSpeedAPI');
        windSpeed.innerText = weather.wind.speed;
     
        UVIndexx(weather.coord.lon,weather.coord.lat);

    })
}
//get the UV Index from the lat and long
function UVIndexx(long,lat){
    //lets build the url for uvindex.
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + long +  "&appid=69b49d9a8462f9c7fe09dc87b6f1c4c2"; 
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $('#UVIndexAPI').html(response.value);
            });
}



//search button eventlistener 
$(".searchBtn").on("click",displayWeather);