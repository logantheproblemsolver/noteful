import React, {Component} from 'react'
import APIContext from '../APIContext'
import CircleButton from '../CircleButton/CircleButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'; 
import config from '../config'



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

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state)
    }


      
    handleNoteSubmit = (noteSubmit) => {
        noteSubmit.preventDefault();
        const addedData = {
            name: this.state.notes,
            content: this.state.content,
            folderId: this.state.folder,
        }

        const url = `${config.API_ENDPOINT}/notes`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${config.API_KEY}`
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
                this.context.addNote(data);
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
                        <input type="text" className="addNoteTitle" id="notes" name="notes" placeholder="Add Your Note Name Here" onChange={this.onChange} />
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="noteContext">What note would you like to put?</label>
                        <br />
                        <input type="text" className="addNoteStuff" name="content" id="noteContext" placeholder="Note Content"  onChange={this.onChange} required/>
                    </div>
                    <div className="addNote-group">
                        <label htmlFor="folderSelector">Which folder would you like it in?</label>
                        <br />
                        <select 
                        value={this.state.folder}
                        id="folderSelector"
                        name="folder"
                        className="folderSelector"
                        onChange={this.onChange}
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

AddNote.propTypes = {
    id: PropTypes.string.isRequired
}


export default AddNote