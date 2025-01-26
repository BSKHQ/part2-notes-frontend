import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("add a new note...")
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>{
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const note = {
      id: (notes.length) +1,
      content: newNote,
      important: Math.random() <0.5
    }
    setNotes(notes.concat(note))
    setNewNote('')
    console.log(notes)
  }
  const handleInputChange = (event) => {
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
    <div>
      <button onClick={()=>setShowAll(!showAll)}>show {showAll? 'important':'All'}</button>
    </div>
      <ul>
        {
          notesToShow.map(
            note => <Note key={note.id} note={note} />
          )
        }
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input
          value={newNote}
          onChange={handleInputChange} />
        <button type="submit">add note</button>
      </form>
    </div>
  )
}

export default App