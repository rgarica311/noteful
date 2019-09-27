import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import { countNotesForFolder } from '../notes-helpers';
import './NoteListNav.css';
import NotefulContext from '../NotefulContext';

export default class NoteListNav extends Component {
  deleteFolderRequest(folderId, callback) {
    fetch(`http://localhost:8005/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },

    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error;
        });
      }
    })
    .then(data => {
      callback(folderId);
      if (this.props.history !== undefined) {
        this.props.history.goBack();
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='NoteListNav'>
            <ul className='NoteListNav__list'>
              {context.folders.map(folder =>
                <li key={folder.id}>
                  <NavLink
                    className='NoteListNav__folder-link'
                    to={`/folders/${folder.id}`}
                  >
                    <span className='NoteListNav__num-notes'>
                      {countNotesForFolder(context.notes, folder.id)}
                    </span>
                    {folder.name}
                    <button className='Folder__delete' type='button'
                    onClick={() => {
                      this.deleteFolderRequest(
                        folder.id,
                        context.deleteFolder
                      );
                    }}
                  >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    remove folder
                  </button>
                  </NavLink>
                </li>
              )}
            </ul>
            <div className='NoteListNav__button-wrapper'>
              <CircleButton
                tag={Link}
                to='/add-folder'
                type='button'
                className='NoteListNav__add-folder-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
                Folder
              </CircleButton>
            </div>
          </div>
        )}
        </NotefulContext.Consumer>
    );
  }
}

NoteListNav.defaultProps = {
  folders: [],
};
