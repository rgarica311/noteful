import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateNoteName(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateNoteName.propTypes = {
  message: PropTypes.string
}
