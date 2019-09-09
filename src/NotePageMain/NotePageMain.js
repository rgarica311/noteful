import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotefulContext from '../NotefulContext'


export default function NotePageMain(props) {
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <section className='NotePageMain'>
          <Note id={context.note.id} name={context.note.name} modified={context.note.modified}/>
          <div className='NotePageMain__content'>
            {context.note.content.split(/\n \r|\n/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
          </div>
        </section>
      )}
      </NotefulContext.Consumer>
  )
}
