function getData() {
	
	//url + apikey + gezochte stad
	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="1c6187dfc03b1e7fb3198b7217c7cac3";
	var city = document.getElementById("city").value;

	//de request wordt hier gevormd
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;

	// zoek het huidige weer
	fetch(request).then(function(response) {
		return response.json();
	})

	// laat het huidige weer zien als het mogelijk is
	.then(function(response) {
		onSuccess(response);
	})

	// laat een foutmelding zien als het niet mogelijk is
	.catch(function (error) {
		onError(error);
	});
}


function onSuccess(response) {

	var celsius = Math.floor(response.main.temp - 273.15); //temperatuur in celsius
	var wind = Math.round(response.wind.speed * 3.6); //haalt windkracht op
	var clouds = response.clouds.all;
	var location = response.name;
	var weatherDOM = document.getElementById('degrees'); //plaatst de temperatuur in id degrees
	var windDOM = document.getElementById('kmperh'); //plaatst de windkracht in id kmperh
	var cloudsDOM = document.getElementById('cloud');
	var locationDOM = document.getElementById('name')
	locationDOM.innerHTML = location;
	cloudsDOM.innerHTML = clouds + "&#37";
	weatherDOM.innerHTML = celsius + "&#176;C"; //zorgt voor 'graden celsius' achter de temperatuur
	windDOM.innerHTML = wind + " km/h"; //zorgt voor km/h achter de windsnelheid

	if (wind >= 30 || clouds >= 30) {
	document.getElementById("safe").src='img/onveilig.svg';
	}
	else {
	document.getElementById("safe").src='img/veilig.svg';
	}

	TweenMax.from("#location", 0.5, {ease:Expo.easeOut, top:800, opacity:0, scale:0});
	TweenMax.from("#temperature", 0.5, {ease:Expo.easeOut, right:800, opacity:0, scale:0, delay:0.3});
	TweenMax.from("#wind", 0.5, {ease:Expo.easeOut, left:800, opacity:0, scale:0, delay:0.6});
	TweenMax.from("#clouds", 0.5, {ease:Expo.easeOut, right:800, opacity:0, scale:0, delay:0.9});
	TweenMax.from("#advice", 0.5, {ease:Expo.easeOut, left:800, opacity:0, scale:0, delay:1.2});
}

function onError(error) {
	console.error('Fetch request failed', error); //zet error in console
	alert('Deze plaats lijkt niet te bestaan, probeer het nog eens ;)'); //geef alert weer
}

document.getElementById("fixedbox").onsubmit = function(e){ //geeft temperatuur bij klik op id search
	e.preventDefault();
	getData();
};







