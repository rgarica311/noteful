import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateFolder(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateFolder.propTypes = {
  message: PropTypes.string
}
