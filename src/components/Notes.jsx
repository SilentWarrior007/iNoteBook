import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

    const handleChnage = (e) => {
      console.log("State is changing");
      setNote({...note, [e.target.name] : e.target.value});
    }

    const handleClick = (e) => {
      console.log("Updating note....", note)
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      props.showAlert(" Notes successfully updated", "success")
    }

  return (
    <>
      <AddNote showAlert = {props.showAlert}/>

      {/* Added a modal */}
      <div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Note Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChnage} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Enter your note description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChnage} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Enter your note tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChnage} />
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No Notes to display here!'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert = {props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;
