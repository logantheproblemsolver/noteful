import React, {Component} from 'react'
import APIContext from '../APIContext'
import CircleButton from '../CircleButton/CircleButton'
import ValidationError from '../ValidationError'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import config from '../config'

import { Route } from 'react-router-dom'



class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: '',
            folder: '',
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

    handleNewNote = (e) => {
        this.setState = ({
            note: e,
        })

    }

    handleNewTitle = (e) => {
        this.setState = ({
            title: e,
        })
    }

    handleFolderChoice = (e) => {
        this.setState = ({
            folder: e,
        })
    }


    handleNoteSubmit = (noteSubmit) => {
        console.log(this.state.note)
        noteSubmit.preventDefault();
        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "text"
            }
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

        const folderOptions = this.context.folders.map((folder, i) => <option value={folder} key={i}> {folder.name} </option>)

        



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
                <form className="addNote-group" onSubmit = {e => this.handleNoteSubmit(e)}>
                    <h1>Add a note!</h1>
                    <div className="note_title">
                        <label htmlFor="title">What would you like your Note Title to be?</label>
                        <br />

                        <input type="text" className="addNoteTitle" name="title" defaultValue="Note Title" value={this.state.title} onChange={e => this.handleNewTitle(e.target.value)} />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="note">What note would you like to put?</label>
                        <br />
                        <input type="text" className="addNoteStuff" name="note" defaultValue="Put your note here" value={this.state.note} onChange={e => this.handleNewNote(e.target.value)}/>
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="folder">Which folder would you like it in?</label>
                        <br />
                        <select 
                        defaultValue="Select a Folder"
                        id="folderSelector"
                        className="folderSelector"
                        defaultValue='first folder'
                        value={this.state.folder}
                        onChange={e => this.handleFolderChoice(e.target.value)}
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