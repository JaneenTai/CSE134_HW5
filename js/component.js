class sunriseSunset extends HTMLElement {

}

fetch('https://api.sunrise-sunset.org/v2?lat=36.72&lng=-4.42')
  .then(response => response.json())
  .then(data => {
    console.log('Sunrise:', data.sunrise);
    console.log('Sunset:', data.sunset);
})
.catch(error => console.error(error));

const sunrise = data.sunrise;
const sunset = data.sunset;