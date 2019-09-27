import React from 'react';
import './CircleButton.css';
import PropTypes from 'prop-types';

export default function CircleButton(props) {
  const { tag, className, childrenm, ...otherProps } = props;
  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps,
    },
    props.children
  );
}

CircleButton.defaultProps = {
  tag: 'a',
};

CircleButton.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  tag: (props, propName) => {
    const prop = props[propName];

    if (typeof prop != 'function') {
      if (typeof prop != 'string') {
        return new Error(`Invalid prop, ${propName} is expected to be a string or function
          ${propName} is of type ${typeof prop}`);
      }
    }
  },

  to: PropTypes.string,
  type: PropTypes.string,
};
