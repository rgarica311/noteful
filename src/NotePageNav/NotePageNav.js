import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import NotefulContext from '../NotefulContext'


export default function NotePageNav(props) {
  return (
    <NotefulContext.Consumer>
    {(context) => (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {context.folder && (
          <h3 className='NotePageNav__folder-name'>
            {context.folder.name}
          </h3>
        )}
      </div>
    )}
    </NotefulContext.Consumer>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}
