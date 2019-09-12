import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'

import NotefulContext from '../NotefulContext'

import AddFolderError from '../ErrorBoundaries/AddFolderError'
import AddNoteError from '../ErrorBoundaries/AddNoteError'
import NotePageError from '../ErrorBoundaries/NotePageError'


class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: null,

    };


    setFolders = folders => {
      this.setState({
        folders
      })
    }

    setNotes = notes => {
      this.setState({
        notes
      })
    }

    deleteNote = noteId => {
      const newNotes = this.state.notes.filter(note =>
        note.id !== noteId
      )
      this.setState({
        notes: newNotes
      })
    }

    getFolders = () =>  {
      fetch('http://localhost:9090/folders')
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))
    }

    getNotes = () => {
      fetch('http://localhost:9090/notes')
      .then(res => {
        if(!res.ok) {
          throw new Error(res.stats)
        }
        return res.json()
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }))
    }

    componentDidMount() {
        // fake date loading from API call
        //setTimeout(() => this.setState(dummyStore), 600);
        fetch('http://localhost:9090/folders')
        .then(res => {
          if(!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(this.setFolders)
        .catch(error => this.setState({ error }))

        fetch('http://localhost:9090/notes')
        .then(res => {
          if(!res.ok) {
            throw new Error(res.stats)
          }
          return res.json()
        })
        .then(this.setNotes)
        .catch(error => this.setState({ error }))
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route exact key={path} path={path} component={NoteListNav}/>
                ))}
                <Route path="/note/:noteId" render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    const note = findNote(notes, noteId) || {};
                    const folder = findFolder(folders, note.folderId);
                    return <NotePageNav {...routeProps} folder={folder} />;
                }}/>

                <Route path="/add-folder" component={NotePageNav}/>
                <Route path="/add-folder" render={props =>
                <div>
                  <AddFolderError>
                    <AddFolder history={props.history} getFolders={this.getFolders}/>
                  </AddFolderError>
                </div>} />
                <Route path="/add-note" component={NotePageNav}/>
                <Route path="/add-note" render={props =>
                <div>
                  <AddNoteError>
                    <AddNote history={props.history} getNotes={this.getNotes} folders={this.state.folders}/>
                  </AddNoteError>
                </div>} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route exact key={path} path={path} render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                            <NoteListMain
                                {...routeProps}
                                notes={notesForFolder}
                            />
                        );
                    }}/>
                ))}
                <Route path="/note/:noteId" render={routeProps => {
                  const {noteId} = routeProps.match.params
                  const note = findNote(notes, noteId)
                  return (
                    <NotePageError>
                      <NotePageMain {...routeProps} note={note}/>
                    </NotePageError> )
                }}/>
            </>
        );
    }

    render() {
      const contextValue = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.deleteNote,
        setFolders: this.setFolders
      }
        return (
          <NotefulContext.Provider value={contextValue}>
            <div className="App">
                <nav className="App__nav">
                  {this.renderNavRoutes()}
                </nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">
                          Noteful
                        </Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">
                  {this.renderMainRoutes()}
                </main>
            </div>
          </NotefulContext.Provider>
        );
    }
}

export default App;
