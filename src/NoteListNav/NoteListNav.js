import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import APIContext from '../APIContext'
import {getNotesForFolder} from '../notes-helpers'
import './NoteListNav.css'




export default class NoteListMain extends React.Component {


    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = APIContext



    render() {
        const {folderId} = this.props.match.params
        const {notes = []} = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        console.log(notesForFolder)
        return (
            <section className='NoteListNav'>
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

                <div className='NoteListNav_button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='NoteListNav_add-folder-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Folder
                    </CircleButton>
                </div>
            </section>
        )
    }
}




