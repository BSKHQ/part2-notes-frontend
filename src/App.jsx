import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  //console.log('render', notes.length, 'notes')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: Math.random() < 0.5
    }

    axios
      .post('http://localhost:3001/notes', note)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(note))
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
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n=> n.id === id)
    const changedNote = {...note, important: !note.important}

    axios.put(url, changedNote).then(response=>{
      setNotes(notes.map(n=> n.id === id ? response.data : n))
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
            note => <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)} />
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