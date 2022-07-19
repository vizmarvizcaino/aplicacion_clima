const apiKey = '9e122cd782b2d0333f5fe4e7fa192062'

const card = document.getElementById('card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const velocity = document.getElementById('velocity');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
  const temp = toCelsius(data.main.temp);
  let src = 'images/temp-mid.png';
  if (temp > 26) {
    src = 'images/temp-high.png';
  } else if (temp < 20) {
    src = 'images/temp-low.png';
  }
  tempImg.src = src;
}

function initialize() {
  var input = document.getElementById('searchbox');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
    document.getElementById('city2').value = place.name;
    document.getElementById('cityLat').value = place.geometry.location.lat();
    document.getElementById('cityLng').value = place.geometry.location.lng();
    let latitud = place.geometry.location.lat();
    let longitud = place.geometry.location.lng();
    getApi(latitud, longitud);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


function getApi(lat, lon) {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => {
        resolve(response.data);
        const data = response.data
        populationHtml(data);
      })
  })

}
function populationHtml(data) {
  card.style.display = 'block';
  city.innerHTML = `${data.name}, ${data.sys.country}`;
  date.innerHTML = (new Date()).toLocaleDateString();
  temp.innerHTML = `${toCelsius(data.main.temp)}c`;
  velocity.innerHTML = `${data.wind.speed}km`;
  weather.innerHTML = data.weather[0].description;
  range.innerHTML = `🌤${toCelsius(data.main.temp_min)}c / ⛅️${toCelsius(data.main.temp_max)}c`;
  updateImages(data);
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}



