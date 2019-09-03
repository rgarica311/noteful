import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from './CircleButton'
import { countNotesForFolder } from './notes-helpers'
import './NotesListSideBar.css'

export default function NotesListSideBar(props) {
  return (
    <div className='NotesListSideBar'>
      <ul className='NotesListSideBar__list'>
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NotesListSideBar__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NotesListSideBar__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NotesListSideBar__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NotesListSideBar__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
  )
}

NotesListSideBar.defaultProps = {
  folders: []
}
