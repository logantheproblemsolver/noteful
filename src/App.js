import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteData from './NoteData'
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import './App.css';




class App extends Component {
  state = {
      folders: [],
      notes: [],
    }
  


  componentDidMount() {
    setTimeout(() => this.setState(NoteData), 600)
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
                />
            )}
            />
        ))}
        <Route 
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
          />
          <Route path="/add-folder" component={NotePageNav} />
          <Route path="/add-note" component={NotePageNav} />
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
            render={routeProps => {
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
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note}
          />;
          }} 
        />
      </>
    )
  }


  render() {
    console.log(this.state.folders)
    console.log(this.state.notes)
    return (
      <div className="App">
        <nav className="App_nav">{this.renderNavRoutes()}</nav>
        <header>
          <h1>
            <Link to="/">Noteful</Link>{' '}
            <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App_main">{this.renderMainRoutes()}</main>
      </div>
    );
  }

}

export default App;
