import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import APIContext from '../APIContext'
import config from '../config'
import './Note.css'



export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }

  static contextType = APIContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.noteId
  

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({error})
      })
}
  render() {
    const {name, id, modified} = this.props 
    return (

      <div className='Note'>
        <h2 className='Note_title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button 
          className='Note_delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '} 
          remove
        </button>
        <div className='Note_date-modified'>
          Modified
          {' '}
          <span className='Date'>
          {format(new Date(modified),'do MMM yyyy')}
          </span>
        </div>
      </div>
    )
  }
}