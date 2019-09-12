import React, { Component } from 'react'
import ValidateFolder from './ValidateFolder'
import './AddFolder.css'
import NotefulContext from '../NotefulContext'


export default class AddFolder extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false
      },

    }

  }

  updateFolderName(name){
    this.setState({name: {value: name, touched: true}})
  }

  validateFolderName(value) {
    const name = this.state.name.value.trim()
    if(name.length === 0) {
      return 'Name is required'
    } else if (name.length < 3) {
      return 'Folder name must be at lest 3 character long'
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const name = this.state.name
    const data = {name: name.value}
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(
      this.props.getFolders,
      this.props.history.push('/')
    )
    .catch(error => console.error('Error:', error))
  }

  render(){

    return(
      <NotefulContext.Consumer>
      {(context) => (
        <form className="addFolder" onSubmit={e => this.handleSubmit(e, context.setFolders)}>
          <h2>Add Folder</h2>
          <div className="formGroup">
            <label htmlFor="name">Folder Name</label>
            <input type="text" className="folder-input" name="name" onChange={e => this.updateFolderName(e.target.value)}/>
            {this.state.name.touched && (
              <ValidateFolder message={this.validateFolderName()}/>
            )}
          </div>
          <button type="submit" className="add-folder-button" disabled={
            this.validateFolderName()
          }>Save
          </button>
        </form>
      )}
      </NotefulContext.Consumer>

    )
  }

}
