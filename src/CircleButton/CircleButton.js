import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types'

export default function CircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props
  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

CircleButton.defaultProps ={
  tag: 'a',
}

CircleButton.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  tag: PropTypes.func,
  to: PropTypes.string,
  type: PropTypes.string
}
