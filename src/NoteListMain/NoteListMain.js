import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {countNotesForFolder} from '../notes-helpers'
import APIContext from '../APIContext'
import AddNote from '../AddNote/AddNote'
import './NoteListMain.css'


export default class NoteListNav extends React.Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            displayAddNoteForm: false,
        }
    }
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
        const {folders=[], notes=[]} = this.context
        console.log(countNotesForFolder)
        return (
            <div className='NotelistNav'>
                <ul className='NoteListNav_list'>
                    {folders.map(folder => 
                        <li key={folder.id}>
                            <NavLink   
                                className='NoteListNav_folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='NoteListNav_num-notes'>
                                    {countNotesForFolder(notes, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
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
                    <div className="add_note">                    
                        {this.state.displayAddNoteForm === true && (
                            <AddNote />
                        )
                        }
                    </div>
                </div>


            </div>
        )
    }


}

