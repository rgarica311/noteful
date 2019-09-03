import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from './Note'
import CircleButton from './CircleButton'
import './NotesList.css'

export default function NotesList(props) {
return (
<section className='NotesList'>
  <ul>
    {props.notes.map(note =>
      <li key={note.id}>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
      </li>
    )}
  </ul>
  <div className='NotesList__button-container'>
    <CircleButton
      tag={Link}
      to='/add-note'
      type='button'
      className='NotesList__add-note-button'
    >
      <FontAwesomeIcon icon='plus' />
      <br />
      Note
    </CircleButton>
  </div>
</section>
)
}

NotesList.defaultProps = {
notes: [],
}
