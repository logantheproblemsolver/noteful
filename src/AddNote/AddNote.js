import React, {Component} from 'react'
import APIContext from '../APIContext'
import CircleButton from '../CircleButton/CircleButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import config from '../config'

import {Link} from 'react-router-dom'



class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: ' ',
            content: ' ',
            folder: ' ',
        }
    }

    static contextType = APIContext

    validateNote(fieldValue) {
        const name = this.notesInput.value
        console.log(name)
        if (name.length === 0) {
            return 'Do not leave the notes field blank, please!'
        }
    }

    handleNewNoteName = (event) => {
        console.log(event);
        this.setState = ({
            notes: event,
        })
    }

    handleNewNote = (event) => {
        console.log(event);
        this.setState = ({
            content: event,
        })
    }

    handleFolderChoice = (event) => {
        console.log(event);
        this.setState = ({
            folder: event,
        })
    }

    handleNoteSubmit = (noteSubmit) => {
        noteSubmit.preventDefault();
        const addedData = {
            notes: this.state.notes,
            content: this.state.content,
            folder: this.state.folder,
        }

        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addedData)
        }




        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err.message)
            });
    }



    render() {
        const folderOptions = this.context.folders.map((folder, i) => <option value={folder.id} key={i}> {folder.name} </option>)

       

        



        return (
            <div className="addNote">
                <CircleButton 
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='NotePagenav_back-button'
                >
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
                    Back
                </CircleButton>
                <form className="addNote-group"  onSubmit={e => this.handleNoteSubmit(e)}>
                    <h1>Add a note!</h1>
                    <div className="note_title">
                        <label htmlFor="title">What would you like your Note Name to be?</label>
                        <br />
                        <input type="text" className="addNoteTitle" name="title" defaultValue="Note Title"  onChange={(name) => this.handleNewNoteName(name.target.value)} />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="noteContext">What note would you like to put?</label>
                        <br />
                        <input type="text" className="addNoteStuff" name="noteContext" id="noteContext" defaultValue="Put your note here" onChange={(note) => this.handleNewNote(note.target.value)}required/>
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="folderSelector">Which folder would you like it in?</label>
                        <br />
                        <select 
                        defaultValue="Select a Folder"
                        id="folderSelector"
                        name="folderSelector"
                        className="folderSelector"
                        onChange={(folder) => this.handleFolderChoice(folder.target.value)}
                        >
                            {folderOptions}
                        </select>
                    </div>

                    <button
                    type="submit"
                    
                    >
                        Submit Note
                    </button>


                    <button 
                    type="reset"
                    
                    >
                        Cancel Note
                    </button>
                </form>
            </div>
        )
    }
}


export default AddNote