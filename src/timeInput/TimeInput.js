import React from 'react'

import { secondsToMinutes } from '../formatTime';

const timeInput = (props) => {
  let warningInput = null;
  if (props.showWarningInput) {
    warningInput = <span>
      Play audio warning.<input type="checkbox"></input>
    </span>
  }

  let text = props.text;
  if (!text) {
    text = "Enter a warning time below:";
  }

  return (
    <div className="time-input">
      <h3>{text}</h3>
      <span>
        <input
          max={props.startingTime}
          min={0} type='number'
          onChange={props.changeTime}
          defaultValue={secondsToMinutes(props.startingTime)}
        >
        </input>
        {warningInput}
      </span>
    </div>
  )
}

export default timeInput
