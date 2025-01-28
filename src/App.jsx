import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const handleFormSubmit = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: Math.random() < 0.5
    }

    const temp = noteService
      .create(note)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const handleInputChange = (event) => {
    setNewNote(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id
          ? returnedNote
          : note))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'All'}</button>
      </div>
      <ul>
        {
          notesToShow.map(
            note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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