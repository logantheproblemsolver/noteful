import React from 'react';
import {NavLink, Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {countNotesForFolder} from '../notes-helpers'
import APIContext from '../APIContext'
import './NoteListNav.css'



export default class NoteListNav extends React.Component {
    static contextType = APIContext;

    render() {
        const {folders=[], notes=[]} = this.context
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
            </div>
        )
    }


}

