import React from 'react'

const button = (props) => {
  return (
    <div>
      <button className="btn btn-success btn-block" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
}

export default button
