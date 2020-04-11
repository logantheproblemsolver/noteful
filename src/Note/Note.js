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

  handleClickDelete = (event, id) => {
    event.preventDefault();


    fetch(`${config.API_ENDPOINT}/notes/${id}`, {
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
      .then((id) => {
        this.context.deleteNote(id)
        this.props.onDeleteNote(id)
      })
      .catch(error => {
        console.error({error})
      })
}
  render() {
    const modified = `${new Date()}`
    const {name, id} = this.props 
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
          onClick={(event) => this.handleClickDelete(event, id)}
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