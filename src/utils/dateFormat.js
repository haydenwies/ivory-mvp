const calculateFinishTime = (waitTime) => {
  // Calculates the current time
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let date = getDate();

  // Calculates the new finish time in 12HR format based on the selected wait time
  today.setMinutes(parseInt(today.getMinutes()) + waitTime);
  minutes = today.getMinutes();
  hours = today.getHours();
  ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};

const getTime = (idFormat, isTwelveHour) => {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let ampm = "";
  if (isTwelveHour) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  }
  minutes = minutes < 10 ? "0" + minutes : minutes;
  if (idFormat) {
    hours = hours >= 10 ? hours : `0${hours}`;
    return `${hours}${minutes}`;
  }
  return hours + ":" + minutes + (isTwelveHour ? " " + ampm : "");
};

const getDate = (idFormat) => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  day = day >= 10 ? day : `0${day}`;
  month = month >= 10 ? month : `0${month}`;
  if (idFormat) {
    return `${today.getFullYear()}${month}${day}`; //Gets current date
  }
  return `${today.getFullYear()}-${month}-${day}`; //Gets current date
};
export { calculateFinishTime, getDate, getTime, getSeconds };

const getSeconds = () => {
  let today = new Date();
  let seconds = today.getSeconds().toFixed(0);
  seconds = seconds >= 10 ? seconds : `0${seconds}`;
  return seconds;
};
