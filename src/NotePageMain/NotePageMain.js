import React from 'react'
import Note from '../Note/Note'
import APIContext from '../APIContext'
import {findNote} from '../notes-helpers'
import './NotePageMain.css'




export default class NotePageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType= APIContext


    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const {notes=[]} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {content: ''}
        return (
            <section className='NotePageMain'>
                <Note 
                    id={note.id}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='NotePageMain_content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}

