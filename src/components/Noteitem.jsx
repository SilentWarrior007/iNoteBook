import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    return (
        <>
        <div className="col-md-3">
            <div className="card mb-3">
                <div className="card-body my-3">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert(" Notes successfully deleted!", "success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default Noteitem