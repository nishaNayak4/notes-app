import { useEffect, useState } from 'react'
import Card from '../components/Card'

const Home = () => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({
    title: "",
    desc: ""
  })

  useEffect(() => {
    console.log("I am use effect")

    let localNotes = localStorage.getItem("notes")

    if (localNotes) {
      setNotes(JSON.parse(localNotes))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedNotes = [...notes, currentNote]

    setNotes(updatedNotes)

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    )

    setCurrentNote({
      title: "",
      desc: ""
    })
  }

  const deleteNote = (title) => {
    const updatedNotes = notes.filter(
      item => item.title !== title
    )

    setNotes(updatedNotes)

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    )
  }

  const handleChange = (e) => {
    setCurrentNote({
      ...currentNote,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <main>
        <h1>Create your note</h1>

        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="title">
              Title
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={currentNote.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="desc">
              Description
            </label>

            <textarea
              name="desc"
              id="desc"
              value={currentNote.desc}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Submit
          </button>

        </form>
      </main>

      <section className="noteSection">

        <h2>Your Notes</h2>

        <div className="container">

          {notes.map(note => (
            <Card
              key={note.title}
              title={note.title}
              desc={note.desc}
              deleteNote={deleteNote}
            />
          ))}

          {notes.length === 0 && (
            <div>
              Add a note to continue
            </div>
          )}

        </div>

      </section>
    </>
  )
}

export default Home