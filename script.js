var APIKey          = "69b49d9a8462f9c7fe09dc87b6f1c4c2"
let cardRow         = $(".card-row");
var searchTerm      = $("#searchTermBox");
let citySearch      = searchTerm.val().trim();
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
};
//Get current weather to appear in HTML
function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey; 
    var citySearch = city; 
    $.ajax({
        url:queryURL,
        method: "GET",
    }).then(function(weather){

        const today = moment().format("MMM Do YYYY"); 
        document.getElementById("time").innerHTML = today;
        //Display contents to HTML
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
        //Call UVIndex function
        UVIndexx(weather.coord.lon,weather.coord.lat);
        
        //5 Day Forcast 
        var forcastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + APIKey; 
            $.ajax({
                url:forcastQuery,
                method:"GET"
            }).then(function(weather){
            //Loop contents for all 5 days in the forcast
                for (i=0;i<5;i++){
                    var iconcode= weather.list[((i+1)*8)-1].weather[0].icon;
                    var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
                    var tempK= weather.list[((i+1)*8)-1].main.temp;
                    var humidity= weather.list[((i+1)*8)-1].main.humidity;
                    //Display contents to particular elements in HTML
                    $("#forcastImage"+i).html("<img src="+iconurl+">");
                    $("#forcastTemperature"+i).html(tempK+"&#8457");
                    $("#forcastHumidity"+i).html(humidity+"%");
                }
                
            });

    })
} 
//Get the UV Index from the lat and long
function UVIndexx(long,lat){
    //URL for the UV Index
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + long +  "&appid=69b49d9a8462f9c7fe09dc87b6f1c4c2"; 
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(weather){
                $('#UVIndexAPI').html(weather.value);
            });
}
   

//Search button eventlistener 
$(".searchBtn").on("click",displayWeather);


