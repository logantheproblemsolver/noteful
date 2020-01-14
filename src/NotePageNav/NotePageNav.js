import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import APIContext from '../APIContext'
import {findNote, findFolder} from '../notes-helpers'
import AddFolder from '../AddFolder/AddFolder'
import './NotePageNav.css'


export default class NotePageNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        math: {
            params: {}
        },
    }
    static contextType = APIContext;

    render() {
        const {notes, folders} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className = 'NotePageNav'>
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
                {folder && (
                    <h3 className='NotePageNav_folder-name'>
                        {folder.name}
                    </h3>
                )}
                <div className="add_folder">
                    <AddFolder />
                </div>
            </div>
        )
    
    }
}