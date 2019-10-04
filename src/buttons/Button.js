import React from 'react'

const button = (props) => {
  return (
    <span>
      <button onClick={props.handleClick}>{props.name}</button>
    </span>
  )
}

export default button
