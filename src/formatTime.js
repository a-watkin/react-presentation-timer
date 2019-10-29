function secondsToMinutesMessage(time) {
  let seconds = parseInt(time, 10);

  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  if (seconds > 0) {
    return `${minutes} minutes and ${seconds} seconds`;
  }

  return `${minutes} minutes`;
}

function secondsToMinutes(time) {
  let seconds = parseInt(time, 10);

  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return minutes;
}

function formatDisplayTime(time) {
  let seconds = parseInt(time, 10);

  var hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  if (hours < 10) {
    hours = '0' + hours
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (hours > 0) {
    time = hours + ':' + minutes + ':' + seconds
  } else {
    time = minutes + ":" + seconds;
  }

  return time;
}

export {
  secondsToMinutesMessage,
  secondsToMinutes,
  formatDisplayTime
};
