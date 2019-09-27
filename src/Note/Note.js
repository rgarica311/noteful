import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'
import { format } from 'date-fns'



export default class Note extends Component {


  deleteNoteRequest(noteId, callback){

    fetch(`http://localhost:8005/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      //return res.json()
    })
    .then(data => {
      callback(noteId)
      if(this.props.history !== undefined){
        this.props.history.goBack()
      }

    })
    .catch(error => {
      console.error(error)
    })
  }

  render(){
    return (
      <NotefulContext.Consumer>
      {(context) => (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${this.props.id}`}>
              {this.props.name}
            </Link>
          </h2>
          <button className='Note__delete' type='button'
            onClick={() => {
              this.deleteNoteRequest(
                this.props.id,
                context.deleteNote
              )
            }}
          >
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(this.props.modified)}
              </span>
            </div>
          </div>
        </div>
      )}
      </NotefulContext.Consumer>

    )

  }

}

Note.propTypes = {
  id: PropTypes.string,
  modified: PropTypes.string,
  name: PropTypes.string,
}
