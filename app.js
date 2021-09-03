// show date & time in html
const showDate = () => {
  let nowDate = new Date(),
    month = nowDate.toLocaleString('default', {
      month: 'short'
    }),
    date = nowDate.getDate(),
    hours = ('0' + nowDate.getHours()).slice(-2),
    minutes = ('0' + nowDate.getMinutes()).slice(-2),
    seconds = ('0' + nowDate.getSeconds()).slice(-2);

  // Access the .show__date for the display date and time 
  const showDateTime = document.querySelector('.show__date');
  showDateTime.innerHTML = `${month} ${date}, ${hours}:${minutes}:${seconds}`
}

// Refresh the showDate function every 1 second 
setInterval(() => showDate(), 1000);


// Get api location
const getLocation = async () => {
  const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon';
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