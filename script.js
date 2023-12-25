// Enabling and Disabling Dark Mode
function myfunction() {
    let element = document.body;
    element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
}
    
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "", // Your API KEY
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
};

// Converting 10 digit timestamp fetched from API to hours and minutes format
const convertTime = (timestamp, timeZone) => {
    const date = new Date(timestamp * 1000);
    const options = { hour12: true, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    const formattedTime = date.toLocaleTimeString('en-US', options);
    return formattedTime;
};


const getWeather = (city) => {
    cityName.innerHTML = city;
    fetch(
        "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            cloud_pct.innerHTML = response.cloud_pct;
            temp.innerHTML = response.temp;           
            humidity.innerHTML = response.humidity;
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp;
            wind_speed.innerHTML = response.wind_speed;
            wind_degrees.innerHTML = response.wind_degrees;

            // Convert and display sunrise and sunset times in local time zone
			const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			sunrise.innerHTML = convertTime(response.sunrise, userTimeZone);
			sunset.innerHTML = convertTime(response.sunset, userTimeZone);

        })
        .catch((err) => console.error(err));
};


submit.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(city.value);
});

getWeather("Mumbai"); //Default city
