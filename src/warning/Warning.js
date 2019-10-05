import React from 'react'
import { secondsToMinutesMessage } from '../formatTime';


const warning = (props) => {

  let { time, firstWarning, secondWarning, startingTime } = props;

  let message = 'Plenty of time, you got this.'
  if (secondWarning >= startingTime) {
    message = `Some of your warnings are invalid!`;
  } else if (firstWarning >= startingTime) {
    message = `Some of your warnings are invalid!`;
  } else {

    if (time <= firstWarning) {
      message = `Less than ${secondsToMinutesMessage(firstWarning)}, nearly there!`;
    }

    if (time <= secondWarning) {
      message = `Less than ${secondsToMinutesMessage(secondWarning)}, almost done!`;
    }

    if (time === 0) {
      message = "Time's up!";
    }
  }

  return (
    <div>
      <h3>{message}</h3>
    </div>
  )

}

export default warning;