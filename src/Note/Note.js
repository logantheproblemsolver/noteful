import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default function Note(props) {
    const props1 = props.modified 
  return (
    <div className='Note'>
      <h2 className='Note_title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note_delete' type='button'>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note_dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            new Date(props1("01 2019"))
          </span>
        </div>
      </div>
    </div>
  )
}