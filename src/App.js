import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import Main from './Main'
import MainSidebar  from './MainSidebar'
import NotesList from './NotesList'
import NotesListSideBar from './NotesListSideBar'
import dummyStore from './dummy-store'
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route exact key={path} path={path}
                        render={routeProps => (
                            <NotesListSideBar folders={folders} notes={notes} {...routeProps}/>
                        )}
                    />
                ))}
                <Route path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotesListSideBar {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotesListSideBar} />
                <Route path="/add-note" component={NotesListSideBar} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NotesList
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <Main {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
    }
}

export default App;
