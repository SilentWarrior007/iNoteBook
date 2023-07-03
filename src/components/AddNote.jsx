import React, { useState, useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    
    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleChnage = (e) => {
      console.log("State is changing");
      setNote({...note, [e.target.name] : e.target.value});
    }

    const handleClick = () => {
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag: ""});
      props.showAlert(" Notes successfully added!", "success")
    }

  return (
    <div>
        <div className="container my-5 border border-info-subtle">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Note Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChnage} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Enter your note description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChnage} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Enter your note tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChnage} />
        </div>
        <div className="my-2">
            <button type="button" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
        </div>
      </div>
    </div>
  )
}

export default AddNote