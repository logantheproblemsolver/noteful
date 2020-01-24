import React, {Component} from 'react'
import APIContext from '../APIContext'
import CircleButton from '../CircleButton/CircleButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import config from '../config'

import {Link} from 'react-router-dom'



class AddNote extends Component {

    static contextType = APIContext

    validateNote(fieldValue) {
        const name = this.notesInput.value
        console.log(name)
        if (name.length === 0) {
            return 'Do not leave the notes field blank, please!'
        }
    }



    handleNoteSubmit = (noteSubmit) => {
        noteSubmit.preventDefault();
 
        const addedData = {note: this.context.notes}
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
                this.context.handleNoteAdd();
            })
            .catch(err => {
                console.log(err.message)
            });
    }



    render() {
        console.log(this.context.notes);
        console.log(this.context.folders)
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
                <form className="addNote-group"  >
                    <h1>Add a note!</h1>

                    <div className="addNote-group">
                        <label htmlFor="noteContext">What note would you like to put?</label>
                        <br />
                        <input type="text" className="addNoteStuff" name="noteContext" id="noteContext" defaultValue="Put your note here" />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="folderSelector">Which folder would you like it in?</label>
                        <br />
                        <select 
                        defaultValue="Select a Folder"
                        id="folderSelector"
                        name="folderSelector"
                        className="folderSelector"
                        onClick={e => this.handleFolderChoice(e.target.value)}
                        >
                            {folderOptions}
                        </select>
                    </div>
                    <Link to="/">
                    <button
                    type="submit"
                    onClick={e => this.handleNoteSubmit(e)}
                    >
                        Submit Note
                    </button>
                    </Link>

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