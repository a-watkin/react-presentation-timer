import React from 'react'
import { secondsToMinutesMessage } from '../formatTime';

const warning = (props) => {
  let { time, firstWarning, secondWarning, startingTime } = props;

  let message = 'Plenty of time, you got this.'

  if (time <= firstWarning) {
    message = `Less than ${secondsToMinutesMessage(firstWarning)} minutes left, nearly there!`;
  }

  if (time <= secondWarning) {
    message = `Less than ${secondsToMinutesMessage(secondWarning)} minutes left, nearly there!`;
  }

  if (time === 0) {
    message = "Time's up!";
  }

  if (firstWarning > startingTime || secondWarning > startingTime) {
    message = `Some of your warnings are invalid!`;
  }


  return (
    <div>
      <h2>{message}</h2>
    </div>
  )

}
 
export default warning;
