import React, { Component } from 'react'
import ValidateNote from './ValidateNote'
import findFolderId from './findFolderId'
import './AddNote.css'


export default class AddNote extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folder: {
        value: '',
        touched: false
      }
    }

  }

  updateNoteName(name){
    this.setState({name: {value: name, touched: true}})
  }

  updateNoteFolder(folder){
    console.log('selected note folder', folder)
    this.setState({folder: {value: folder, touched: true}})
  }

  updateNoteContent(content){
    this.setState({content: {value: content, touched: true}})
  }

  validateNote(value) {
    const name = this.state.name.value.trim()
    if(name.length === 0) {
      return 'Name is required'
    } else if (name.length < 3) {
      return 'Note name must be at lest 3 character long'
    }
  }

  validateNoteFolder(value) {
    const folderName = this.state.folder.value.trim()
    const folders = []

    console.log('folders object', this.props.folders)

    for(let i=0; i<this.props.folders.length; i++) {
      folders.push(this.props.folders[i].name)
    }
    if(folders.includes(folderName)){
      console.log(`Folder ${folderName} is available`)
      return `Folder ${folderName} is available`
    } else {
      console.log(`Folder ${folderName} does not exist`)
      return `Folder ${folderName} does not exist`
    }
    console.log('folders',folders)
  }

  validateNoteContent(value) {
    const name = this.state.content.value.trim()
    if(name.length === 0) {
      return 'Name is required'
    } else if (name.length < 3) {
      return 'Note name must be at lest 3 character long'
    }
  }



  handleSubmit(e) {
    e.preventDefault()
    const name = this.state.name
    const folderName = this.state.folder.value.trim()
    const folderIndex = findFolderId(this.props.folders, 'name', folderName )
    const folderId = this.props.folders[folderIndex].id
    const content = this.state.content
    const data = {name: name.value, folderId: folderId, content: content.value }
    fetch('http://localhost:9090/Notes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error))
    console.log('name.value:', name.value)
  }

  renderOptions() {
    return (
      <>
        {this.props.folders.map(folder => (
          console.log('folder', folder),
          <option key={folder.name} value={folder.name}>{folder.name}</option>
        ))
        }
      </>
    )

  }

  render(){
    return(
      <form className="addNote" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>
        <div className="formGroup">
          <label htmlFor="name">Note Name:</label>
          <input type="text" className="add-note-control" name="name" onChange={e => this.updateNoteName(e.target.value)}/>
          {this.state.name.touched && (
            <ValidateNote message={this.validateNote()}/>
          )}
          <label htmlFor="Content">Note:</label>
          <input type="text" className="add-note-content-control" name="Content" onChange={e => this.updateNoteContent(e.target.value)}/>
          {this.state.content.touched && (
            <ValidateNote message={this.validateNoteContent()}/>
          )}
          <label htmlFor="Folder">Pick Folder:</label>
          <select name="Folder" onChange={e => this.updateNoteFolder(e.target.value)}>
            {this.renderOptions()}
          </select>
        </div>
        <button type="submit" className="add-note-button" disabled={
          this.validateNote()
        }>Save
        </button>
      </form>
    )
  }

}
