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

  handleClickDelete = (id) => {
    id.preventDefault();
  

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
      .then(() => {
        this.context.deleteNote(id)
        this.props.onDeleteNote(id)
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
          onClick={(id) => this.handleClickDelete(id)}
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