import React from 'react'
import Note from './Note'
import './Main.css'

export default function Main(props) {
return (
<section className='Main'>
  <Note
    id={props.note.id}
    name={props.note.name}
    modified={props.note.modified}
  />
  <div className='Main__content'>
    {props.note.content.split(/\n \r|\n/).map((para, i) =>
      <p key={i}>{para}</p>
    )}
  </div>
</section>
)
}

Main.defaultProps = {
note: {
content: '',
}
}
