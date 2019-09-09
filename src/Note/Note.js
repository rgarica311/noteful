import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

function deleteNoteRequest(noteId, callback){
  console.log('callback', callback)
  console.log('noteId', noteId)
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => {
    if(!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    callback(noteId)
  })
  .catch(error => {
    console.error(error)
  })
}

export default function Note(props) {
  console.log('note props', props)
  return (
    <NotefulContext.Consumer>
    {(context) => (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${props.id}`}>
            {props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button'
          onClick={() => {
            deleteNoteRequest(
              props.id,
              context.deleteNote
            )
          }}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {props.modified}
            </span>
          </div>
        </div>
      </div>
    )}
    </NotefulContext.Consumer>

  )
}

Note.propTypes = {
  id: PropTypes.string,
  modified: PropTypes.string,
  name: PropTypes.string,
}
