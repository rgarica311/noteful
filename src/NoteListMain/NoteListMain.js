import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListMain.css';

export default function NoteListMain(props) {
  return (

      <section className='NoteListMain'>
        <ul>
          {props.notes.map(note =>
            <li key={note.id}>
              <Note
                id={note.id.toString()}
                name={note.name}
                modified={note.modified}
                folderid={note.folderid}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'>

            <FontAwesomeIcon icon='plus' />

            Note
          </CircleButton>
        </div>
      </section>

  );
}

NoteListMain.defaultProps = {
  notes: [],
};
