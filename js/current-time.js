URLParams = new URLSearchParams(window.location.search);

if (URLParams.has("time") === true) {
  time = moment(URLParams.get("time"), moment.ISO_8601);
} else {
  time = moment();
}

timeUTC = moment.tz(time, "UTC").format();
timeLondon = moment.tz(time, "Europe/London").format();
timeParis = moment.tz(time, "Europe/Paris").format();
timeBrussels = moment.tz(time, "Europe/Brussels").format();

document.body.innerHTML =
  "UTC             : " +
  timeUTC +
  "<br />" +
  "Europe/London   : " +
  timeLondon +
  "<br />" +
  "Europe/Paris    : " +
  timeParis +
  "<br />" +
  "Europe/Brussels : " +
  timeBrussels;
