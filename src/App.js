import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import APIContext from './APIContext'
import {getNotesForFolder, findNote, findFolder} from './notes-helpers';
import AddNote from './AddNote/AddNote'
import config from './config'
import ValidationError from './ValidationError'
import './App.css';




class App extends Component {
  state = {
      folders: [],
      notes: [],
    }
  




  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      });
  }


  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleFolderData = (event) => {
    event.preventDefault();
    this.setState = ({
      folders: event.target.value,
    })
  }

  handleNoteSubmit = (noteSubmit) => {
    noteSubmit.preventDefault();
    console.log(noteSubmit);
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;

    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            component={NoteListNav}
            />
        ))}
        <Route 
          path="/note/:noteId"
          component={NotePageNav}
          />
          <Route 
            path="/add-folder" 
            component={NotePageNav} />
          <Route 
            path="/add-note" 
            component={AddNote} 
            handleFolderData = {this.handleFolderData}
            onSubmit = {noteSubmit => this.handleNoteSubmit(noteSubmit)}
            />
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
            component={NoteListMain}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageMain}
        />;
      </>
    );
  }

  


  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (

        <APIContext.Provider value={value} >
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
        </APIContext.Provider>



    );
  }

}

export default App;
