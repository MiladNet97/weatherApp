// Get api Time
const getTime = async (timeZone) => {
  const url = `https://api.ipgeolocation.io/timezone?apiKey=cfefae5f618a4ef58da0140b5a6429d0&tz=${timeZone}`;
  const response = await fetch(url);
  const data = await response.json()
  return data
}

// Get api location
const getLocation = async () => {
  const url = 'http://ip-api.com/json/?fields=country,city,lat,lon,timezone';
  const response = await fetch(url);
  const data = await response.json()

  return data
}

// Get api weather
const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1ddf41823a38df4480b1fa08fcb1c6c1`;
  const response = await fetch(url);
  const data = await response.json()
  return data
}

// Get Day Or Night
const getDayOrNight = () => {
  let DayOrNight,
    date = new Date();
  const hour = date.getHours();

  if (hour >= 6 && hour <= 19) DayOrNight = 'Day';
  else DayOrNight = 'Night';

  return DayOrNight;
}

// Get Icon
const getIcon = weMain => {
  let icon;
  switch (weMain) {
    case 'Thunderstorm':
      icon = `${weMain}.svg`;
      break;
    case 'Drizzle':
      icon = `${weMain}.svg`;
      break;
    case 'Rain':
      icon = `${weMain}.svg`;
      break;
    case 'Snow':
      icon = `${weMain}.svg`;
      break;
    case 'Clear':
      const DayOrNigh = getDayOrNight();
      icon = `${weMain}-${DayOrNigh}.svg`;
      break;
    case 'Clouds':
      icon = `${weMain}.svg`;
      break;
    case 'Atmosphere':
      icon = `${weMain}.png`;
      break;
    case 'Mist':
      icon = `${weMain}.svg`;
      break;
  }
  return icon;
}

// Get temperature
const getTemp = weTemp => {
  const k = weTemp,
    f = (k - 273.15) * 9 / 5 + 32,
    c = k - 273.15;
  return temp = {
    far: Math.floor(f),
    can: Math.floor(c)
  };
}

// Vriables
let tempData = document.querySelector('.temperature__data'),
  tempUnit = document.querySelector('.temperature__unit'),
  tempCel = document.querySelector('.temperature__cel'),
  tempFar = document.querySelector('.temperature__far'),
  tempDes = document.querySelector('.temperature__description'),
  country = document.querySelector('.weather__country'),
  city = document.querySelector('.weather__city'),
  humidity = document.querySelector('.weather__humidity'),
  windSpeed = document.querySelector('.weather__speed'),
  weIcon = document.querySelector('.weather__icon');


window.addEventListener('load', () => {
  getLocation()
    .then(locData => {
      country.textContent = locData.country;
      city.textContent = locData.city;
      getWeather(locData.lat, locData.lon)
        .then(weData => {
          const weTemp = weData.main.temp;
          weMain = weData.weather[0].main,
            weDes = weData.weather[0].description,
            weHumidity = weData.main.humidity,
            wiSpeed = weData.wind.speed;

          // Show temperature in html 
          tempData.textContent = getTemp(weTemp).can;
          tempFar.classList.add('disable')

          tempUnit.addEventListener('click', e => {
            if (e.target.classList.contains('temperature__cel')) {
              tempFar.classList.add('disable')
              tempCel.classList.remove('disable')
              tempData.textContent = getTemp(weTemp).can;
            } else if (e.target.classList.contains('temperature__far')) {
              tempCel.classList.add('disable')
              tempFar.classList.remove('disable')
              tempData.textContent = getTemp(weTemp).far;
            }
          })

          // Show temperature description in html 
          tempDes.textContent = weDes;

          // Show temperature icon in html 
          weIcon.src = `icons/${getIcon(weMain)}`

          // Show humidity in html 
          humidity.textContent = weHumidity + '%';

          // Show wind speed in html 
          windSpeed.textContent = Math.floor(wiSpeed * 3.6) + ' km/h';
        })

      getTime(locData.timezone)
        .then(timeData => {
          let data = timeData.date_time_wti.slice(5, 11),
            time = timeData.time_24.slice(0, 5);

          // Access the .show__date for the display date and time 
          const showDateTime = document.querySelector('.show__date');
          showDateTime.innerHTML = `${data}, ${time}`
        })
    })
})