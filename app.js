// show date & time in html
function showDate() {
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