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
    text = "Enter a warning time:";
  }

  return (
    <div className="row">

      <div className="col text-left">
        <p>{text}</p>
      </div>

      <div className="col text-right my-auto">
        <input className="text-center"
          max={props.startingTime}
          min={0} type='number'
          onChange={props.changeTime}
          defaultValue={secondsToMinutes(props.startingTime)}
        >
        </input>
      </div>
      {warningInput}

    </div>
  )
}

export default timeInput
