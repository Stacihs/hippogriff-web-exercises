"use script";

mapboxgl.accessToken = MAPBOX_API_KEY;
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/outdoors-v12',
	zoom: 10,
	center: [-98.491142, 29.424349]
})

// *******GEOCODING********

// mapboxgl.accessToken = MAPBOX_API_KEY;
// const map = new mapboxgl.Map({
// 	container: 'map', // container ID
// 	style: 'mapbox://styles/mapbox/navigation-day-v1', // style URL
// 	center: [-98.491142, 29.424349], // starting position [lng, lat]
// 	zoom: 10, // starting zoom
// });
//
// geocode("600 Navarro St #350, San Antonio, TX 78205", MAPBOX_API_KEY).then(result => {
// 	console.log(result);
// 	map.setCenter(result);
// 	map.setZoom(10);
// });

// ********FOR CURRENT FORECAST***********
fetch(`https://api.openweathermap.org/data/2.5/weather?` + `id=4726206` + `&appid=${OPEN_WEATHER_API_KEY}&units=imperial`)
	.then(data => data.json())
	.then(currentWeather => {
		console.log(currentWeather);
		displayWXConditions(currentWeather);
		createMarker(currentWeather);
	});

// ***********FOR 5DAY FORECAST********
fetch(`https://api.openweathermap.org/data/2.5/forecast?` + `id=4726206` + `&appid=${OPEN_WEATHER_API_KEY}&units=imperial`)
	.then(data => data.json())
	.then(forecast => {
		console.log(forecast);
		displayFiveDayForecast(forecast);
	});

// ********VARIABLES**********
const main = document.querySelector("main");
const mapSection = document.querySelector("#map-row");
const userInput = document.querySelector("#location").value;
const wxIconURL = `https://openweathermap.org/img/wn/`;
// const feels_likeHeader = document.createElement("h4");
// const feels_like = document.createElement("p");
// const description = document.createElement("p");
// description.innerText = currentWeather.weather[0].description;
// const humidityHeader = document.createElement("h4");
// const humidity = document.createElement("p");

// (currentWeather.main.feels_like);
// (currentWeather.main.humidity);
// (currentWeather.dt);

//**********FUNCTIONS***********
const displayWXConditions = (currentWeather) => {
	const dateTime = document.createElement("p");
	dateTime.innerText = convertDateTime(currentWeather.dt);
	const tempHeader = document.createElement("h2");
	tempHeader.innerText = "Current Conditions";
	const temp = document.createElement("h3");
	temp.innerText = currentWeather.main.temp.toFixed(0);
	const icon = document.createElement("span");
	const wxIcon = wxIconURL + currentWeather.weather[0].icon + '.png';
	icon.innerHTML = '<img src="' + wxIcon + '" />';
	const tempSection = document.createElement("section");
	tempSection.classList.add("row");
	const daily = document.createElement("div");
	daily.classList.add("card");
	tempSection.appendChild(daily);
	daily.appendChild(dateTime);
	daily.appendChild(tempHeader);
	daily.appendChild(temp);
	daily.appendChild(icon);
	main.insertBefore(tempSection, mapSection);
}



const displayFiveDayForecast = (forecast) => {
	const tempFiveSection = document.createElement("section");
	tempFiveSection.classList.add("row");
	forecast.list.forEach((day, index) => {
		if (index % 8 === 0) {
			const daily = document.createElement("div")
			daily.classList.add("card");
			const dateTime = document.createElement("p");
			dateTime.innerText = convertDateTime(day.dt);
			const dailyTemp = document.createElement("h3");
			dailyTemp.innerText = day.main.temp.toFixed(0);
			const fiveIcon = document.createElement("span");
			const wxFiveIcon = wxIconURL + day.weather[0].icon + '.png';
			fiveIcon.innerHTML = '<img src="' + wxFiveIcon + '" />';
			tempFiveSection.appendChild(daily);
			daily.appendChild(dateTime);
			daily.appendChild(dailyTemp);
			daily.appendChild(fiveIcon);
			main.insertBefore(tempFiveSection, mapSection);
		}
	});
}

const convertDateTime = (dt) => {
	const timeStamp = dt;
	const milliseconds = timeStamp * 1000;
	const dateObject = new Date(milliseconds);
	const readableDate = dateObject.toLocaleDateString();
	return(readableDate);
}


const createMarker= (data) => {
	const mapLat= data.coord.lat;
	const mapLon= data.coord.lon;
	const marker = new mapboxgl.Marker({
		draggable: true
		})
		.setLngLat([mapLon,mapLat])
		.addTo(map);
}
//ALLOW USER TO DROP PIN AND UPDATE FORECAST