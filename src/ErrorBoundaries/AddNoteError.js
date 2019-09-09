import React, { Component } from 'react'

export  default class AddNoteError extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true}
  }

  render(){
    if (this.state.hasError) {
      return (
        <h2>Could not render Add Note Form</h2>
      )
    }
    return this.props.children
  }
}
