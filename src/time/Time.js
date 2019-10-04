import React from 'react'
import { formatDisplayTime } from '../formatTime'

const time = (props) => {

  let time = formatDisplayTime(props.time);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}

export default time;
