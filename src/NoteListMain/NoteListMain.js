import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import APIContext from '../APIContext'
import {getNotesForFolder} from '../notes-helpers'
import AddNote from '../AddNote/AddNote'
import './NoteListMain.css'




export default class NoteListMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAddNoteForm: false,
        }
    }


    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = APIContext

    addNoteDisplay() {
        if (this.state.displayAddNoteForm === false) {
            return this.setState = ({
                displayAddNoteForm: true,
            })
        } else {
            return this.setState = ({
                displayAddNoteForm: false,
            })
        }

    }



    render() {
        const {folderId} = this.props.match.params
        const {notes = []} = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className='NoteListMain'>
                <ul> 
                    {notesForFolder.map(note => 
                        <li key={note.id}>
                            <Note 
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>
                        )}
                </ul>
                <div className='NoteListrMain_button-container'>
                    <CircleButton 
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain_add-note-button'
                        onClick = {() => this.addNoteDisplay()}
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Note
                    </CircleButton>
                    <div className="add_folder">                    
                        {this.state.displayAddNoteForm === true && (
                            <AddNote />
                        )
                        }
                    </div>
                </div>
            </section>
        )
    }
}




